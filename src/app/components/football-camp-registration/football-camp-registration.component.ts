import {switchMap} from 'rxjs/operators';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog, MatVerticalStepper} from '@angular/material';
import {AngularFireAuth} from '@angular/fire/auth';
import {FootballCampShouldConnectDialogComponent} from '../football-camp-should-connect-dialog/football-camp-should-connect-dialog.component';
import {Subscription} from 'rxjs';
import {FootballCamp} from '../../models/football-camp';
import {RegistrationService} from '../../services/registration/registration.service';
import {Registration} from '../../models/registration';
import {Gender} from '../../models/gender.enum';
import * as moment from 'moment';
import {FieldPosition} from '../../models/field-position.enum';
import {Feet} from '../../models/feet.enum';
import {RegistrationState} from '../../models/registration-state.enum';
import {UploadService} from '../../services/upload/upload.service';
import {Meta, Title} from '@angular/platform-browser';
import * as firebase from 'firebase';
import {FootballCampRegistrationSessionsComponent} from '../football-camp-registration-sessions/football-camp-registration-sessions.component';
import {FootballCampRegistrationTraineeFormComponent} from '../football-camp-registration-trainee-form/football-camp-registration-trainee-form.component';
import {FootballCampRegistrationDocumentsComponent} from '../football-camp-registration-documents/football-camp-registration-documents.component';
import {FootballCampRegistrationPaymentComponent} from '../football-camp-registration-payment/football-camp-registration-payment.component';

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = true;

  // Model to save data
  registration: Registration;

  // View Childs
  @ViewChild(FootballCampRegistrationSessionsComponent) sessionComponent: FootballCampRegistrationSessionsComponent;
  @ViewChild(FootballCampRegistrationTraineeFormComponent) traineeFormComponent: FootballCampRegistrationTraineeFormComponent;
  @ViewChild(FootballCampRegistrationDocumentsComponent) documentsComponent: FootballCampRegistrationDocumentsComponent;
  @ViewChild(FootballCampRegistrationPaymentComponent) paymentComponent: FootballCampRegistrationPaymentComponent;
  @ViewChild('stepper') stepper: MatVerticalStepper;

  // Payment From & Controls
  paymentFormGroup: FormGroup;
  payment: FormControl;

  footballCamp: FootballCamp;

  private _subscriptions: Subscription[];

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
        switchMap<Params, FootballCamp>((params) => {
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
        console.log('----------- footballCamp :');
        console.log(this.footballCamp);
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

  ngAfterViewInit(): void {
    console.log('FootballCampRegistrationComponent.ngAfterViewInit()');

    this.stepper.selectionChange.asObservable()
      .subscribe((selection) => {
        if (selection.selectedIndex === 4) {
          this.stepper._steps.forEach((step) => step.editable = false);
        }
      })
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

  onNextPayment(): void {
    // this.isLoading = true;
    //
    // this.registration = {
    //   address: {
    //     city: this.city.value,
    //     state: 'FRANCE',
    //     streetAddress: this.streetAddress.value,
    //     zipCode: this.zipCode.value
    //   },
    //   birthdate: firebase.firestore.Timestamp.fromDate((this.registrationForm.get('birthdate').value as moment.Moment).toDate()),
    //   club: (this.registrationForm.get('club').value as string),
    //   email: (this.registrationForm.get('email').value as string),
    //   fieldPosition: FieldPosition[this.registrationForm.get('fieldPosition').value as string],
    //   feet: Feet[this.registrationForm.get('feet').value as string],
    //   firstname: (this.registrationForm.get('firstname').value as string),
    //   gender: Gender[this.registrationForm.get('gender').value as string],
    //   lastname: (this.registrationForm.get('lastname').value as string),
    //   legalRepresentative: {
    //     address: {
    //       city: this.legalRepresentativeCity.value,
    //       state: 'FRANCE',
    //       streetAddress: this.legalRepresentativeStreetAddress.value,
    //       zipCode: this.legalRepresentativeZipCode.value
    //     },
    //     firstname: this.legalRepresentativeFirstname.value,
    //     healthInsurance: {
    //       memberNumber: this.legalRepresentativeHealthInsuranceMemberNumber.value,
    //       name: this.legalRepresentativeHealthInsuranceName.value,
    //       socialSecurityNumber: this.legalRepresentativeSocialSecurityNumber.value
    //     },
    //     lastname: this.legalRepresentativeLastname.value,
    //     phoneNumber: this.legalRepresentativePhoneNumber.value
    //   },
    //   photoURL: this.downloadURL,
    //   sessionId: this.sessionComponent.selectedSession.getValue().id,
    //   state: RegistrationState.IN_PROGRESS
    // };
    //
    // // TODO: try to do it in one call instead of callback..
    // this.registrationService
    //   .save(this.registration)
    //   .then(() => {
    //     this.isLoading = false;
    //     this.payment.setValue('done');
    //     this.stepper.next();
    //   })
  }
}
