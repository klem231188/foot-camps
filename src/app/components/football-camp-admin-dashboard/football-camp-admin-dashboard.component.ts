import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {Role} from '../../models/role.enum';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../models/football-camp';
import {AngularFireAuth} from '@angular/fire/auth';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../../services/user/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatButton, MatDialog, MatSelect, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {SessionService} from '../../services/session/session.service';
import {Session} from '../../models/session';
import {RegistrationV2} from '../../models/registration-v2.model';
import {RegistrationService} from '../../services/registration/registration.service';
import {SelectionModel} from '@angular/cdk/collections';
import {SelectionChange} from '@angular/cdk/collections/typings/selection';
import {RegistrationState} from '../../models/registration-state.enum';
import {PaymentService} from '../../services/payment/payment.service';
import {Payment} from '../../models/payment';
import {HttpClient} from '@angular/common/http';
import {Document} from '../../models/document.model';
import {DocumentType} from '../../models/document-type.enum';
import {FootballCampRegistrationExportComponent} from '../football-camp-registration-export/football-camp-registration-export.component';

@Component({
  selector: 'app-football-camp-admin-dashboard',
  templateUrl: './football-camp-admin-dashboard.component.html',
  styleUrls: ['./football-camp-admin-dashboard.component.scss']
})
export class FootballCampAdminDashboardComponent implements OnInit, AfterViewChecked {

  // User
  user: User;

  // FootballCamp
  footballCamps: FootballCamp[];
  selectedFootballCamp: BehaviorSubject<FootballCamp>;
  @ViewChild('uiControlFootballCamp') uiControlFootballCamp: MatSelect;
  uiControlFootballCampInitialized: boolean;

  // Session
  sessions: Session[];
  selectedSession: BehaviorSubject<Session>;
  @ViewChild('uiControlSession') uiControlSession: MatSelect;
  uiControlSessionInitialized: boolean;

  // Registration
  registrations: RegistrationV2[];
  selectedRegistration: BehaviorSubject<RegistrationV2>;
  displayedColumns: string[] = ['select', 'firstname', 'lastname', 'state'];
  uiControlRegistration: SelectionModel<RegistrationV2>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<RegistrationV2>;
  @ViewChild('exportPdfButton') exportPdfButton: MatButton;

  // Payment
  payment: Observable<Payment>;

  constructor(
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    private userService: UserService,
    private footballCampService: FootballCampService,
    private sessionService: SessionService,
    private registrationService: RegistrationService,
    private paymentService: PaymentService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.selectedFootballCamp = new BehaviorSubject<FootballCamp>(null);
    this.uiControlFootballCampInitialized = false;

    this.selectedSession = new BehaviorSubject<Session>(null);
    this.uiControlSessionInitialized = false;

    this.selectedRegistration = new BehaviorSubject<RegistrationV2>(null);
    const initialSelection = [];
    const allowMultiSelect = false;
    this.uiControlRegistration = new SelectionModel<RegistrationV2>(allowMultiSelect, initialSelection);
  }

  ngOnInit() {
    console.log('FootballCampAdminDashboardComponent.ngOnInit()');

    // Get connected user
    this.angularFireAuth.authState
      .pipe(
        switchMap((firebaseUser) => {
          // Get associated user stored in firestore
          return this.userService.getUser(firebaseUser.uid);
        })
      ).subscribe((user: User) => {
      // According to role, get football camps
      this.user = user;
      switch (user.role) {
        case Role.ORGANIZER :
          this.footballCampService
            .getFootballCamp(user.campId)
            .subscribe((footballCamp: FootballCamp) => {
              this.footballCamps = [footballCamp];
              this.selectedFootballCamp.next(this.footballCamps[0]);
            });
          break;
        case Role.ADMIN:
          this.footballCampService
            .getFootballCamps()
            .subscribe((footballCamps: FootballCamp[]) => {
              this.footballCamps = footballCamps;
              this.selectedFootballCamp.next(this.footballCamps[0]);
            });
          break;
        case Role.USER :
          this.footballCamps = [];
          break;
      }
    });

    this.selectedFootballCamp
      .subscribe((footballCamp: FootballCamp) => {
        if (footballCamp) {
          this.selectedSession.next(null);

          this.sessionService
            .getSessionsFromCampId(footballCamp.id)
            .subscribe((sessions: Session[]) => {
              this.sessions = sessions;
              if (this.sessions.length > 0) {
                this.selectedSession.next(this.sessions[0]);
              }
            });
        }
      });

    this.selectedSession
      .subscribe((session: Session) => {
        this.selectedRegistration.next(null);
        this.uiControlRegistration.toggle(this.selectedRegistration.value);

        if (session) {
          this.registrationService
            .getRegistrations(session.id)
            .subscribe((registrations: RegistrationV2[]) => {
              this.registrations = registrations;
              this.dataSource = new MatTableDataSource(this.registrations);
              if (this.registrations.length > 0) {
                this.selectedRegistration.next(this.registrations[0]);
                this.uiControlRegistration.toggle(this.selectedRegistration.value);
              }
            });
        }
      });

    this.uiControlRegistration
      .changed
      .subscribe((value: SelectionChange<RegistrationV2>) => {
        if (value.added.length === 0) {
          this.selectedRegistration.next(null);
        } else {
          this.selectedRegistration.next(value.added[0]);
        }
      });

    this.selectedRegistration
      .subscribe((registration: RegistrationV2) => {
        if (registration) {
          this.payment = this.paymentService.getPayment(registration.paymentId)
        }
      });
  }

  ngAfterViewChecked(): void {
    if (this.uiControlFootballCamp && !this.uiControlFootballCampInitialized) {
      this.uiControlFootballCampInitialized = true;
      this.uiControlFootballCamp.registerOnChange((footballCamp: FootballCamp) => {
        this.selectedFootballCamp.next(footballCamp);
      });

      this.selectedFootballCamp
        .subscribe((footballCamp: FootballCamp) => {
          this.uiControlFootballCamp.value = footballCamp;
        })
    }

    if (this.uiControlSession && !this.uiControlSessionInitialized) {
      this.uiControlSessionInitialized = true;
      this.uiControlSession.registerOnChange((session: Session) => {
        this.selectedSession.next(session);
      });

      this.selectedSession
        .subscribe((session: Session) => {
          this.uiControlSession.value = session;
        })
    }

    if (this.sort && this.dataSource && !this.dataSource.sort) {
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'firstname':
            return item.trainee.firstname;
          case 'lastname':
            return item.trainee.lastname;
          default:
            return item[property];
        }
      };
      this.dataSource.sort = this.sort;
    }
  }

  accept(registration: RegistrationV2): void {
    this.registrationService
      .update(registration, {state: RegistrationState.ACCEPTED})
      .then(() => console.log('Registration updated with success'));
  }

  reject(registration: RegistrationV2): void {
    this.registrationService
      .update(registration, {state: RegistrationState.REJECTED})
      .then(() => console.log('Registration updated with success'));
  }

  print(): void {
    const dialogRef = this.dialog.open(FootballCampRegistrationExportComponent, {
      disableClose: false,
      width: '1240px',
      data: {
        registration: this.selectedRegistration.value,
        session: this.selectedSession.value,
        camp: this.selectedFootballCamp.value
      }
    });

    // const node = document.getElementById('print');
    // console.log(node);
    // htmlToImage.toPng(node)
    //   .then(function (dataUrl) {
    //     const link = document.createElement('a');
    //     link.download = 'my-image-name.png';
    //     link.href = dataUrl;
    //     link.click();
    //     console.log('clicked');
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });
    // const url = environment.urlGeneratePdf;
    //
    // const body = {
    //   registrationId: this.selectedRegistration.value.id
    // }
    //
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json');
    //
    // const options = {
    //   headers: headers,
    //   observe: 'response' as 'body', // hack for TS
    //   responseType: 'blob' as 'json', // hack for TS
    // };
    //
    // this.exportPdfButton.disabled = true;
    // this.http
    //   .post(url, body, options)
    //   .subscribe((response: HttpResponse<Blob>) => {
    //       // Stop loading
    //       // this.isLoadingResults = false;
    //       this.exportPdfButton.disabled = false;
    //       const firstname = this.selectedRegistration.value.trainee.firstname;
    //       const lastname = this.selectedRegistration.value.trainee.lastname;
    //       const filename = `fiche_${firstname}_${lastname}.pdf`;
    //
    //       // Create an anchor element, to be able to rename and download file.
    //       const element: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    //       element.href = URL.createObjectURL(response.body);
    //       element.download = filename;
    //       document.body.appendChild(element);
    //       element.click();
    //       document.body.removeChild(element);
    //
    //       // Says to user that's everything is fine
    //       this.snackBar.open(
    //         'Export réussi',
    //         'Fermer',
    //         {duration: 5000});
    //     }, (error) => {
    //       // Stop loading
    //       // this.isLoadingResults = false;
    //       this.exportPdfButton.disabled = false;
    //
    //       // Says to user that's an error occured
    //       this.snackBar.open(
    //         'Echec lors de l\'export',
    //         'Fermer',
    //         {duration: 5000})
    //     }
    //   );
  }

  getPhotoUrl(registration: RegistrationV2): string {
    return registration.documents.find((doc) => doc.type === DocumentType.PHOTO_IDENTITE).url;
  }

  updateDocument(docUpdated: Document) {
    if (docUpdated !== null) {
      const docStored: Document = this.selectedRegistration.value.documents.find((aDoc) => aDoc.type === docUpdated.type);
      if (docStored.url !== docUpdated.url) {
        console.log(`Update ${JSON.stringify(docUpdated)} to firestore`);

        // Create document array
        const updatedDocs: Document[] = this.selectedRegistration.value.documents.filter((aDoc) => aDoc.type !== docUpdated.type);
        updatedDocs.push(docUpdated);

        // Sort document array per type
        const documentTypeOrder = Object.keys(DocumentType).map(key => DocumentType[key]);
        const updatedDocsSorted = updatedDocs.sort((a, b) => documentTypeOrder.indexOf(a.type) - documentTypeOrder.indexOf(b.type));

        // Update document array in firestore
        this.registrationService.update(this.selectedRegistration.value, {documents: updatedDocsSorted});
      } else {
        console.log(`${docStored.url} === ${docUpdated.url}`);
      }
    }
  }
}
