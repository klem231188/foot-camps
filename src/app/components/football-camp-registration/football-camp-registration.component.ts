import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog, MatVerticalStepper} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import {FootballCampShouldConnectDialogComponent} from '../football-camp-should-connect-dialog/football-camp-should-connect-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import {FootballCamp} from '../../models/football-camp';
import {RegistrationService} from '../../services/registration/registration.service';
import {Registration} from '../../models/registration';
import {Gender} from '../../models/gender.enum';
import * as moment from 'moment';
import {Session} from '../../models/session';
import {SessionService} from '../../services/session/session.service';
import {FieldPosition} from '../../models/field-position.enum';
import {Feet} from '../../models/feet.enum';

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
  isLinear = true;
  isLoading = true;

  // Model to save data
  registration: Registration;

  private genderEnum = Gender;

  // Session Form & Controls
  sessionForm: FormGroup;
  session: FormControl;

  // Registration Form & Controls
  registrationForm: FormGroup;
  address: FormControl;
  birthdate: FormControl;
  club: FormControl;
  email: FormControl;
  feet: FormControl;
  fieldPosition: FormControl;
  firstname: FormControl;
  gender: FormControl;
  lastname: FormControl;

  // Payment From & Controls
  paymentFormGroup: FormGroup;
  payment: FormControl;

  footballCamp: FootballCamp;
  sessions: Session[];

  private _stepper: MatVerticalStepper;

  private _subscriptions: Subscription[];

  @ViewChild('stepper')
  set stepper(stepper: MatVerticalStepper) {
    this._stepper = stepper;
    if (this._stepper) {
      console.log('stepper is not undefined');
      this._stepper.selectionChange.asObservable()
        .subscribe((selection) => {
          if (selection.selectedIndex === 3) {
            this._stepper._steps.forEach((step) => step.editable = false);
          }
        })
    }
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService,
              private sessionService: SessionService,
              private registrationService: RegistrationService,
              public angularFireAuth: AngularFireAuth,
              public dialog: MatDialog,
              private router: Router) {

    this._subscriptions = [];
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationComponent.ngOnInit()');

    // Session Form & Controls
    this.session = new FormControl('', [Validators.required]);

    this.sessionForm = new FormGroup({
      'session': this.session
    });

    // Registration Form & Controls
    this.address = new FormControl('221 rue de la palourde, 12345 Plouvien', [Validators.required]);
    this.birthdate = new FormControl(moment());
    this.club = new FormControl('GSY', [Validators.required]);
    this.email = new FormControl('monemail@gmail.com', [Validators.required, Validators.email]);
    this.feet = new FormControl(Feet.RIGHT_FOOTED, [Validators.required]);
    this.fieldPosition = new FormControl(FieldPosition.MIDFIELDER, [Validators.required]);
    this.firstname = new FormControl('Clément', [Validators.required, Validators.minLength(2)]);
    this.gender = new FormControl(Gender.MALE, [Validators.required]);
    this.lastname = new FormControl('Tréguer', [Validators.required, Validators.minLength(2)]);

    this.registrationForm = new FormGroup({
      'address': this.address,
      'birthdate': this.birthdate,
      'club': this.club,
      'email': this.email,
      'feet': this.feet,
      'fieldPosition': this.fieldPosition,
      'firstname': this.firstname,
      'gender': this.gender,
      'lastname': this.lastname
    });

    // Payment From & Controls
    this.payment = new FormControl('', [Validators.required]);
    this.paymentFormGroup = this.formBuilder.group({
      'payment': this.payment
    });

    // Listnening to events
    const footballCampSub = this.route
      .params
      .switchMap<Params, FootballCamp>((params) => {
        const id: string = params['id'];
        return this.footballCampService.getFootballCamp(id);
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp;
        console.log('----------- footballCamp :');
        console.log(this.footballCamp);
        if (this.footballCamp && this.sessions) {
          this.isLoading = false;
        }
      });

    const sessionSub = this.route
      .params
      .switchMap<Params, Session[]>((params) => {
        const id: string = params['id'];
        return this.sessionService.getSessionsFromCampId(id);
      })
      .subscribe((sessions: Session[]) => {
        this.sessions = sessions;
        console.log('----------- sessions :');
        console.log(this.sessions);
        if (this.footballCamp && this.sessions) {
          this.isLoading = false;
        }
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
    this._subscriptions.push(sessionSub);
    this._subscriptions.push(authStateSubscription);
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

  getFirstnameError() {
    return this.firstname.hasError('required') ? 'Le prénom est obligatoire' :
      this.firstname.hasError('minlength') ? 'Le prénom doit avoir 2 caractères minimum' :
        '';
  }

  getLastnameError() {
    return this.firstname.hasError('required') ? 'Le nom est obligatoire' :
      this.firstname.hasError('minlength') ? 'Le nom doit avoir 2 caractères minimum' :
        '';
  }

  getGenderError() {
    return this.gender.hasError('required') ? 'Le genre est obligatoire' :
      '';
  }

  getEmailError() {
    return this.email.hasError('required') ? 'L\'email est obligatoire' :
      this.email.hasError('email') ? 'L\'email est incorrect' :
        '';
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

  onSessionSelected(session: Session): void {
    console.log(session);
    this.session.setValue(session);
    this._stepper.next();
  }

  onNextPayment(): void {
    this.isLoading = true;

    this.registration = {
      address: (this.registrationForm.get('address').value as string),
      birthdate: (this.registrationForm.get('birthdate').value as moment.Moment).toDate(),
      club: (this.registrationForm.get('club').value as string),
      email: (this.registrationForm.get('email').value as string),
      fieldPosition: FieldPosition[this.registrationForm.get('fieldPosition').value as string],
      feet: Feet[this.registrationForm.get('feet').value as string],
      firstname: (this.registrationForm.get('firstname').value as string),
      gender: Gender[this.registrationForm.get('gender').value as string],
      lastname: (this.registrationForm.get('lastname').value as string),
      sessionId: (this.session.value as Session).id
    };

    // TODO: try to do it in one call instead of callback..
    this.registrationService
      .save(this.registration)
      .then(() => {
        // Promise-returning async function !
        return this.sessionService.updateCurrentNumberOfRegistrations(this.session.value);
      })
      .then(() => {
        this.isLoading = false;
        this.payment.setValue('done');
        this._stepper.next();
      })
  }

}
