import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {RegistrationService} from '../../../services/registration/registration.service';
import {RegistrationV2} from '../../../models/registration-v2.model';
import {PaymentService} from '../../../services/payment/payment.service';
import {Payment} from '../../../models/payment';
import {RegistrationState} from '../../../models/registration-state.enum';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DocumentType} from '../../../models/document-type.enum';
import {Document} from '../../../models/document.model';
import {MatSnackBar} from '@angular/material';
import {SessionService} from '../../../services/session/session.service';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-football-camp-admin-dashboard-registration-details',
  templateUrl: './football-camp-admin-dashboard-registration-details.component.html',
  styleUrls: ['./football-camp-admin-dashboard-registration-details.component.scss']
})
export class FootballCampAdminDashboardRegistrationDetailsComponent implements OnInit, OnChanges {

  campId: string;
  disablePrintButton: boolean;
  loading: boolean;
  payment: Payment;
  registration: RegistrationV2;
  @Input() registrationId: string;
  sessionId: string;

  constructor(
    private registrationService: RegistrationService,
    private sessionService: SessionService,
    private paymentService: PaymentService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {

  }

  accept(registration: RegistrationV2): void {
    this.registrationService
      .update(registration, {state: RegistrationState.ACCEPTED})
      .then(() => console.log('Registration updated with success'));
  }

  getPhotoUrl(registration: RegistrationV2): string {
    return registration.documents.find((doc) => doc.type === DocumentType.PHOTO_IDENTITE).url;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FootballCampAdminDashboardRegistrationDetailsComponent.ngOnChanges()');
    const registrationIdChange: SimpleChange = changes['registrationId'];
    console.log(registrationIdChange);
    if (registrationIdChange.currentValue && registrationIdChange.currentValue !== registrationIdChange.previousValue) {
      this.loading = true;

      this.registrationService
        .getRegistration(this.registrationId)
        .pipe(
          switchMap((registration) => {
            this.registration = registration;
            this.sessionId = this.registration.sessionId;
            return this.paymentService.getPayment(this.registration.paymentId);
          }),
          switchMap((payment) => {
            this.payment = payment;
            return of(null);
            // return Observable.empty();
          }),
          switchMap(() => {
            return this.sessionService.getSession(this.sessionId);
          })
        )
        .subscribe((session) => {
          this.campId = session.campId;
        });
    }
  }

  ngOnInit(): void {
    this.disablePrintButton = false;
    this.loading = true;
  }

  onLoad(): void {
    this.loading = false;
  }

  print(): void {
    const url: string = environment.urlPrintRegistration;

    const body = {
      campId: this.campId,
      sessionId: this.sessionId,
      registrationId: this.registrationId
    };

    const options = {
      observe: 'response' as 'body', // hack for TS
      responseType: 'blob' as 'json', // hack for TS
    };

    this.disablePrintButton = true;
    const filename = `Fiche-Inscription-${this.registration.trainee.lastname}-${this.registration.trainee.firstname}.png`;

    // Says to user to wait ( Duration ~ 10 seconds)
    this.snackBar.open(
      'Veuillez patentier quelques secondes',
      'Fermer',
      {duration: 5000});

    this.http
      .post(url, body, options)
      .subscribe((response: HttpResponse<Blob>) => {
        this.disablePrintButton = false;

        // Create an anchor element, to be able to rename and download file.
        const element: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        element.href = URL.createObjectURL(response.body);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Says to user that's everything is fine
        this.snackBar.open(
          'Fiche d\'inscription téléchargée',
          'Fermer',
          {duration: 5000});
      }, (error) => {
        console.log(error);
        this.disablePrintButton = false;

        // Says to user that an error occured
        this.snackBar.open(
          'Une erreur est survenue lors du téléchargement de la fiche d\'inscription',
          'Fermer',
          {duration: 5000});
      })
  }

  reject(registration: RegistrationV2): void {
    this.registrationService
      .update(registration, {state: RegistrationState.REJECTED})
      .then(() => console.log('Registration updated with success'));
  }

  updateDocument(docUpdated: Document) {
    if (docUpdated !== null) {
      const docStored: Document = this.registration.documents.find((aDoc) => aDoc.type === docUpdated.type);
      if (docStored.url !== docUpdated.url) {
        console.log(`Update ${JSON.stringify(docUpdated)} to firestore`);

        // Create document array
        const updatedDocs: Document[] = this.registration.documents.filter((aDoc) => aDoc.type !== docUpdated.type);
        updatedDocs.push(docUpdated);

        // Sort document array per type
        const documentTypeOrder = Object.keys(DocumentType).map(key => DocumentType[key]);
        const updatedDocsSorted = updatedDocs.sort((a, b) => documentTypeOrder.indexOf(a.type) - documentTypeOrder.indexOf(b.type));

        // Update document array in firestore
        this.registrationService.update(this.registration, {documents: updatedDocsSorted});
      } else {
        console.log(`${docStored.url} === ${docUpdated.url}`);
      }
    }
  }
}
