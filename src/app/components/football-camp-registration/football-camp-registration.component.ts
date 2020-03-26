import {switchMap} from 'rxjs/operators';
import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog, MatVerticalStepper} from '@angular/material';
import {AngularFireAuth} from '@angular/fire/auth';
import {FootballCampShouldConnectDialogComponent} from '../football-camp-should-connect-dialog/football-camp-should-connect-dialog.component';
import {Observable, Subscription} from 'rxjs';
import {FootballCamp} from '../../models/football-camp';
import {RegistrationService} from '../../services/registration/registration.service';
import {RegistrationState} from '../../models/registration-state.enum';
import {UploadService} from '../../services/upload/upload.service';
import {Meta, Title} from '@angular/platform-browser';
import {FootballCampRegistrationSessionsComponent} from '../football-camp-registration-sessions/football-camp-registration-sessions.component';
import {FootballCampRegistrationTraineeFormComponent} from '../football-camp-registration-trainee-form/football-camp-registration-trainee-form.component';
import {FootballCampRegistrationDocumentsComponent} from '../football-camp-registration-documents/football-camp-registration-documents.component';
import {RegistrationV2} from '../../models/registration-v2.model';
import * as firebase from 'firebase';
import {FootballCampRegistrationCheckPaymentComponent} from '../football-camp-registration-check-payment/football-camp-registration-check-payment.component';

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  isLoading = true;

  // Model to save data
  registration: RegistrationV2;

  // View Childs
  @ViewChild(FootballCampRegistrationSessionsComponent, { static: false }) sessionComponent: FootballCampRegistrationSessionsComponent;
  @ViewChild(FootballCampRegistrationTraineeFormComponent, { static: false }) traineeFormComponent: FootballCampRegistrationTraineeFormComponent;
  @ViewChild(FootballCampRegistrationDocumentsComponent, { static: false }) documentsComponent: FootballCampRegistrationDocumentsComponent;
  //@ViewChild(FootballCampRegistrationPaymentComponent) cardPaymentComponent: FootballCampRegistrationPaymentComponent;
  @ViewChild(FootballCampRegistrationCheckPaymentComponent, { static: false }) checkPaymentComponent: FootballCampRegistrationCheckPaymentComponent;
  @ViewChild('stepper', { static: false }) stepper: MatVerticalStepper;

  // Payment From & Controls
  paymentFormGroup: FormGroup;
  payment: FormControl;

  footballCamp: FootballCamp;

  private _subscriptions: Subscription[];
  private cardPaymentSub: Subscription;
  private checkPaymentSub: Subscription;
  private stepperSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService,
              private registrationService: RegistrationService,
              private uploadService: UploadService,
              public angularFireAuth: AngularFireAuth,
              public dialog: MatDialog,
              private router: Router,
              private titleService: Title,
              private meta: Meta) {

    this._subscriptions = [];
    this.cardPaymentSub = null;
    this.checkPaymentSub = null;
    this.stepperSub = null;
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationComponent.ngOnInit()');

    // Payment From & Controls
    this.payment = new FormControl('', [Validators.required]);
    this.paymentFormGroup = this.formBuilder.group({
      'payment': this.payment
    });

    // Listening to events
    const footballCampSub = this.route
      .params.pipe(
        switchMap<Params, Observable<FootballCamp>>((params) => {
          const id: string = params['id'];
          return this.footballCampService.getFootballCamp(id);
        }))
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp;
        this.titleService.setTitle('Footcamps - Inscription au stage de football ' + this.footballCamp.city);
        this.meta.updateTag({
          name: 'description',
          content: 'Inscription au stage de football ' + this.footballCamp.city
        });
        this.meta.updateTag({name: 'keywords', content: 'footcamps, stage, football, inscription'});
        this.isLoading = false;
      });

    const authStateSubscription = this.angularFireAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser && firebaseUser.uid) {
        // Logged
        console.log('Logged');
      } else {
        // Not yet logged
        console.log('Not yet logged');
        this.openDialog();
      }
    });

    this._subscriptions.push(footballCampSub);
    this._subscriptions.push(authStateSubscription);
  }

  ngAfterViewChecked(): void {
    console.log('FootballCampRegistrationComponent.ngAfterViewChecked()');
    // if (this.cardPaymentComponent !== undefined && this.cardPaymentSub === null) {
    //   this.cardPaymentSub = this.cardPaymentComponent.isValid
    //     .subscribe((valid) => {
    //       if (valid) {
    //         this.stepper.selected.completed = true;
    //         this.stepper.next();
    //       }
    //     });
    //
    //   this._subscriptions.push(this.cardPaymentSub);
    // }

    if (this.checkPaymentComponent !== undefined && this.checkPaymentSub === null) {
      this.checkPaymentSub = this.checkPaymentComponent.isValid
        .subscribe((valid) => {
          if (valid) {
            this.stepper.selected.completed = true;
            this.stepper.next();
          }
        });

      this._subscriptions.push(this.checkPaymentSub);
    }

    if (this.stepper !== undefined && this.stepperSub === null) {
      this.stepperSub = this.stepper.selectionChange.asObservable()
        .subscribe((selection) => {
          if (selection.selectedIndex === 4) {
            this.stepper._steps.forEach((step) => step.editable = false);
          }
        });
      this._subscriptions.push(this.stepperSub);
    }
  }

  ngAfterViewInit(): void {
    console.log('FootballCampRegistrationComponent.ngAfterViewInit()');
  }

  ngOnDestroy(): void {
    console.log('FootballCampRegistrationComponent.ngOnDestroy()');
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FootballCampShouldConnectDialogComponent, {
      disableClose: true,
      width: '310px'
    });

    dialogRef.afterClosed().subscribe(shouldConnect => {
      if (shouldConnect) {
        this.router.navigateByUrl('login');
      } else {
        this.router.navigateByUrl('locate');
      }
    });
  }

  saveRegistration(): void {
    if (this.registration && this.registration.id) {
      return;
    }

    this.registration = {
      sessionId: this.sessionComponent.selectedSession.value.id,
      trainee: {
        firstname: this.traineeFormComponent.firstname.value,
        lastname: this.traineeFormComponent.lastname.value,
        gender: this.traineeFormComponent.gender.value,
        birthdate: firebase.firestore.Timestamp.fromDate(this.traineeFormComponent.birthdate.value),
        email: this.traineeFormComponent.email.value,
        club: this.traineeFormComponent.club.value,
        fieldPosition: this.traineeFormComponent.fieldPosition.value,
        feet: this.traineeFormComponent.feet.value,
      },

      documents: this.documentsComponent.documents.value,

      paymentId: null,

      state: RegistrationState.PRE_REGISTERED,
    };

    this.isLoading = true;
    this.registrationService
      .save2(this.registration)
      .then(() => this.isLoading = false)
      .catch(() => this.isLoading = false)
  }
}
