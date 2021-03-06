import {AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RegistrationV2} from '../../models/registration-v2.model';
import {FootballCampRegistrationSessionsComponent} from '../football-camp-registration-sessions/football-camp-registration-sessions.component';
import {FootballCampRegistrationTraineeFormComponent} from '../football-camp-registration-trainee-form/football-camp-registration-trainee-form.component';
import {FootballCampRegistrationDocumentsComponent} from '../football-camp-registration-documents/football-camp-registration-documents.component';
import {MatDialog} from '@angular/material/dialog';
import {MatVerticalStepper} from '@angular/material/stepper';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FootballCamp} from '../../models/football-camp';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {RegistrationService} from '../../services/registration/registration.service';
import {UploadService} from '../../services/upload/upload.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Meta, Title} from '@angular/platform-browser';
import {FootballCampShouldConnectDialogComponent} from '../football-camp-should-connect-dialog/football-camp-should-connect-dialog.component';
import * as firebase from 'firebase';
import {RegistrationState} from '../../models/registration-state.enum';
import {BreakpointObserver} from '@angular/cdk/layout';
import {FootballCampRegistrationPaymentModeComponent} from '../football-camp-registration-payment-mode/football-camp-registration-payment-mode.component';

@Component({
  selector: 'app-football-camp-registration-v2',
  templateUrl: './football-camp-registration-v2.component.html',
  styleUrls: ['./football-camp-registration-v2.component.scss']
})
export class FootballCampRegistrationV2Component implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  _subscriptions: Subscription[];
  @Input() campId: string;
  @ViewChild(FootballCampRegistrationDocumentsComponent) documentsComponent: FootballCampRegistrationDocumentsComponent;
  footballCamp: FootballCamp;
  isLoading = true;
  @ViewChild(FootballCampRegistrationPaymentModeComponent) paymentComponent: FootballCampRegistrationPaymentModeComponent;
  paymentSub: Subscription;
  registration: RegistrationV2;
  @ViewChild(FootballCampRegistrationSessionsComponent) sessionComponent: FootballCampRegistrationSessionsComponent;
  @ViewChild('stepper') stepper: MatVerticalStepper;
  stepperSub: Subscription;
  @ViewChild(FootballCampRegistrationTraineeFormComponent) traineeFormComponent: FootballCampRegistrationTraineeFormComponent;

  constructor(private formBuilder: FormBuilder,
              private breakpointObserver: BreakpointObserver,
              private footballCampService: FootballCampService,
              private registrationService: RegistrationService,
              private uploadService: UploadService,
              public angularFireAuth: AngularFireAuth,
              public dialog: MatDialog,
              private router: Router,
              private titleService: Title,
              private meta: Meta) {
    this._subscriptions = [];
    this.paymentSub = null;
    this.stepperSub = null;
  }

  buildRegistration(): RegistrationV2 {
    return {
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
        shoeSize: this.traineeFormComponent.shoeSize.value,
        shortSize: this.traineeFormComponent.shortSize.value,
      },

      documents: this.documentsComponent.documents.value,
      paymentId: null,

      state: RegistrationState.PRE_REGISTERED,
    };
  }

  isSmallScreen(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 800px)');
  }

  ngAfterViewChecked(): void {
    console.log('FootballCampRegistrationV2Component.ngAfterViewChecked()');
    if (this.paymentComponent !== undefined && this.paymentSub === null) {
      this.paymentSub = this.paymentComponent.isValid
        .subscribe((valid) => {
          if (valid) {
            this.stepper.selected.completed = true;
            this.stepper.next();
          }
        });

      this._subscriptions.push(this.paymentSub);
    }

    if (this.stepper !== undefined && this.stepperSub === null) {
      this.stepperSub = this.stepper.selectionChange.asObservable()
        .subscribe((selection) => {
          if (selection.selectedIndex === 3) {
            if (this.registration) {
              this.updateRegistration();
            } else {
              this.saveRegistration();
            }
          }
          if (selection.selectedIndex === 4) {
            this.stepper._steps.forEach((step) => step.editable = false);
          }
        });
      this._subscriptions.push(this.stepperSub);
    }
  }

  ngAfterViewInit(): void {
    console.log('FootballCampRegistrationV2Component.ngAfterViewInit()');
  }

  ngOnDestroy(): void {
    console.log('FootballCampRegistrationV2Component.ngOnDestroy()');
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationV2Component.ngOnInit()');
    // Listening to events
    const footballCampSub = this.footballCampService
      .getFootballCamp(this.campId)
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

  openDialog(): void {
    const dialogRef = this.dialog.open(FootballCampShouldConnectDialogComponent, {
      disableClose: true,
      width: '310px'
    });

    dialogRef.afterClosed().subscribe(shouldConnect => {
      if (shouldConnect) {
        this.router.navigateByUrl('login');
      } else {
        this.router.navigateByUrl(`locate/${this.campId}/details-v2`);
      }
    });
  }

  async saveRegistration() {
    try {
      this.registration = this.buildRegistration();
      this.isLoading = true;
      console.log('Saving Registration', this.registration);
      await this.registrationService.save(this.registration);
      console.log('Registration saved', this.registration);
      this.isLoading = false;
    } catch (e) {
      console.log('An error occured while saving registration');
      this.isLoading = false;
    }
  }

  async updateRegistration() {
    try {
      const registrationId = this.registration.id;
      this.registration = this.buildRegistration();
      this.registration.id = registrationId;

      this.isLoading = true;
      console.log('Updating Registration', this.registration);
      await this.registrationService.update(this.registration.id, this.registration);
      console.log('Registration updated');
      this.isLoading = false;
    } catch (e) {
      console.log('An error occured while updating registration');
      this.isLoading = false;
    }
  }
}
