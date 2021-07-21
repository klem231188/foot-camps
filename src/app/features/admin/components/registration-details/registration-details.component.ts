import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {RegistrationService} from '../../../../services/registration/registration.service';
import {RegistrationV2} from '../../../../models/registration-v2.model';
import {PaymentService} from '../../../../services/payment/payment.service';
import {Payment} from '../../../../models/payment';
import {RegistrationState} from '../../../../models/registration-state.enum';
import {HttpClient} from '@angular/common/http';
import {DocumentType} from '../../../../models/document-type.enum';
import {Document} from '../../../../models/document.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SessionService} from '../../../../services/session/session.service';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit, OnChanges {

  campId: string;
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
      .update(registration.id, {state: RegistrationState.ACCEPTED})
      .then(() => console.log('Registration updated with success'));
  }

  getPhotoUrl(registration: RegistrationV2): string {
    return registration.documents.find((doc) => doc.type === DocumentType.PHOTO_IDENTITE).url;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('RegistrationDetailsComponent.ngOnChanges()');
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
    this.loading = true;
  }

  onLoad(): void {
    this.loading = false;
  }

  reject(registration: RegistrationV2): void {
    this.registrationService
      .update(registration.id, {state: RegistrationState.REJECTED})
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
        this.registrationService.update(this.registration.id, {documents: updatedDocsSorted});
      } else {
        console.log(`${docStored.url} === ${docUpdated.url}`);
      }
    }
  }
}
