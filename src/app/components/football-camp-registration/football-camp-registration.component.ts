import {switchMap} from 'rxjs/operators';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog, MatVerticalStepper} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
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

  // Session
  @ViewChild(FootballCampRegistrationSessionsComponent) sessionComponent: FootballCampRegistrationSessionsComponent;

  // Session Form & Controls
  sessionForm: FormGroup;
  session: FormControl;

  filename: string;
  downloadURL: string;
  percentageUploaded: number;

  // Registration Form & Controls
  registrationForm: FormGroup;
  birthdate: FormControl;
  club: FormControl;
  city: FormControl;
  email: FormControl;
  feet: FormControl;
  fieldPosition: FormControl;
  firstname: FormControl;
  gender: FormControl;
  lastname: FormControl;
  streetAddress: FormControl;
  zipCode: FormControl;

  legalRepresentativeFirstname: FormControl;
  legalRepresentativeLastname: FormControl;
  legalRepresentativeStreetAddress: FormControl;
  legalRepresentativeZipCode: FormControl;
  legalRepresentativeCity: FormControl;
  legalRepresentativePhoneNumber: FormControl;
  legalRepresentativeSocialSecurityNumber: FormControl;
  legalRepresentativeHealthInsuranceName: FormControl;
  legalRepresentativeHealthInsuranceMemberNumber: FormControl;

  authorization: FormControl;

  // Payment From & Controls
  paymentFormGroup: FormGroup;
  payment: FormControl;

  footballCamp: FootballCamp;

  private _stepper: MatVerticalStepper;

  private _subscriptions: Subscription[];

  @ViewChild('stepper')
  set stepper(stepper: MatVerticalStepper) {
    this._stepper = stepper;
    if (this._stepper) {
      console.log('stepper is not undefined');
      this._stepper.selectionChange.asObservable()
        .subscribe((selection) => {
          if (selection.selectedIndex === 4) {
            this._stepper._steps.forEach((step) => step.editable = false);
          }
        })
    }
  }

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
    this.filename = this.uuidv4();
    this.downloadURL = '';
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationComponent.ngOnInit()');
    // Session
    this.sessionForm = new FormGroup({});

    // Trainee Information

    // Document Upload

    // Payment

    // Summary

    // Session Form & Controls


    // Registration Form & Controls
    // Mock for development purpose
    this.birthdate = new FormControl(moment('2010-11-21'));
    this.club = new FormControl('GSY', [Validators.required]);
    this.city = new FormControl('Plouvien', [Validators.required]);
    this.email = new FormControl('clemtreguer@gmail.com', [Validators.required, Validators.email]);
    this.feet = new FormControl(Feet.RIGHT_FOOTED, [Validators.required]);
    this.fieldPosition = new FormControl(FieldPosition.MIDFIELDER, [Validators.required]);
    this.firstname = new FormControl('Raphaël', [Validators.required, Validators.minLength(2)]);
    this.gender = new FormControl(Gender.MALE, [Validators.required]);
    this.lastname = new FormControl('Tréguer', [Validators.required, Validators.minLength(2)]);
    this.streetAddress = new FormControl('221 rue de la palourde', [Validators.required]);
    this.zipCode = new FormControl('29860', [Validators.required]);

    this.legalRepresentativeFirstname = new FormControl('Clément', [Validators.required, Validators.minLength(2)]);
    this.legalRepresentativeLastname = new FormControl('Tréguer', [Validators.required, Validators.minLength(2)]);
    this.legalRepresentativePhoneNumber = new FormControl('0666322222', [Validators.required]);
    this.legalRepresentativeStreetAddress = new FormControl('221 rue de la palourde', [Validators.required]);
    this.legalRepresentativeZipCode = new FormControl('29860', [Validators.required]);
    this.legalRepresentativeCity = new FormControl('Plouvien', [Validators.required]);
    this.legalRepresentativeSocialSecurityNumber = new FormControl('1881129019', [Validators.required]);
    this.legalRepresentativeHealthInsuranceName = new FormControl('Pro BTP', []);
    this.legalRepresentativeHealthInsuranceMemberNumber = new FormControl('45602205', []);

    this.authorization = new FormControl(false, [Validators.required]);

    // this.birthdate = new FormControl();
    // this.club = new FormControl(null, [Validators.required]);
    // this.city = new FormControl(null, [Validators.required]);
    // this.email = new FormControl(null, [Validators.required, Validators.email]);
    // this.feet = new FormControl(null, [Validators.required]);
    // this.fieldPosition = new FormControl(null, [Validators.required]);
    // this.firstname = new FormControl(null, [Validators.required, Validators.minLength(2)]);
    // this.gender = new FormControl(null, [Validators.required]);
    // this.lastname = new FormControl(null, [Validators.required, Validators.minLength(2)]);
    // this.streetAddress = new FormControl(null, [Validators.required]);
    // this.zipCode = new FormControl(null, [Validators.required]);
    //
    // this.legalRepresentativeCity = new FormControl(null, [Validators.required]);
    // this.legalRepresentativeFirstname = new FormControl(null, [Validators.required, Validators.minLength(2)]);
    // this.legalRepresentativeLastname = new FormControl(null, [Validators.required, Validators.minLength(2)]);
    // this.legalRepresentativePhoneNumber = new FormControl(null, [Validators.required]);
    // this.legalRepresentativeStreetAddress = new FormControl(null, [Validators.required]);
    // this.legalRepresentativeZipCode = new FormControl(null, [Validators.required]);
    // this.legalRepresentativeSocialSecurityNumber = new FormControl('', [Validators.required]);
    // this.legalRepresentativeHealthInsuranceName = new FormControl('', []);
    // this.legalRepresentativeHealthInsuranceMemberNumber = new FormControl('', []);
    //
    // this.authorization = new FormControl(false, [Validators.required]);

    this.registrationForm = new FormGroup({
      'birthdate': this.birthdate,
      'city': this.city,
      'club': this.club,
      'email': this.email,
      'feet': this.feet,
      'fieldPosition': this.fieldPosition,
      'firstname': this.firstname,
      'gender': this.gender,
      'lastname': this.lastname,
      'streetAddress': this.streetAddress,
      'zipCode': this.zipCode,

      'legalRepresentativeCity': this.legalRepresentativeCity,
      'legalRepresentativeFirstname': this.legalRepresentativeFirstname,
      'legalRepresentativeLastname': this.legalRepresentativeLastname,
      'legalRepresentativePhoneNumber': this.legalRepresentativePhoneNumber,
      'legalRepresentativeStreetAddress': this.legalRepresentativeStreetAddress,
      'legalRepresentativeZipCode': this.legalRepresentativeZipCode,
      'legalRepresentativeSocialSecurityNumber': this.legalRepresentativeSocialSecurityNumber,
      'legalRepresentativeHealthInsuranceName': this.legalRepresentativeHealthInsuranceName,
      'legalRepresentativeHealthInsuranceMemberNumber': this.legalRepresentativeHealthInsuranceMemberNumber,

      'authorization': this.authorization
    });

    // Payment From & Controls
    this.payment = new FormControl('', [Validators.required]);
    this.paymentFormGroup = this.formBuilder.group({
      'payment': this.payment
    });

    // Listnening to events
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
    // Session

    // Trainee Information

    // Document Upload

    // Payment

    // Summary

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

  onNextPayment(): void {
    this.isLoading = true;

    this.registration = {
      address: {
        city: this.city.value,
        state: 'FRANCE',
        streetAddress: this.streetAddress.value,
        zipCode: this.zipCode.value
      },
      birthdate: firebase.firestore.Timestamp.fromDate((this.registrationForm.get('birthdate').value as moment.Moment).toDate()),
      club: (this.registrationForm.get('club').value as string),
      email: (this.registrationForm.get('email').value as string),
      fieldPosition: FieldPosition[this.registrationForm.get('fieldPosition').value as string],
      feet: Feet[this.registrationForm.get('feet').value as string],
      firstname: (this.registrationForm.get('firstname').value as string),
      gender: Gender[this.registrationForm.get('gender').value as string],
      lastname: (this.registrationForm.get('lastname').value as string),
      legalRepresentative: {
        address: {
          city: this.legalRepresentativeCity.value,
          state: 'FRANCE',
          streetAddress: this.legalRepresentativeStreetAddress.value,
          zipCode: this.legalRepresentativeZipCode.value
        },
        firstname: this.legalRepresentativeFirstname.value,
        healthInsurance: {
          memberNumber: this.legalRepresentativeHealthInsuranceMemberNumber.value,
          name: this.legalRepresentativeHealthInsuranceName.value,
          socialSecurityNumber: this.legalRepresentativeSocialSecurityNumber.value
        },
        lastname: this.legalRepresentativeLastname.value,
        phoneNumber: this.legalRepresentativePhoneNumber.value
      },
      photoURL: this.downloadURL,
      sessionId: this.sessionComponent.selectedSession.getValue().id,
      state: RegistrationState.IN_PROGRESS
    };

    // TODO: try to do it in one call instead of callback..
    this.registrationService
      .save(this.registration)
      .then(() => {
        this.isLoading = false;
        this.payment.setValue('done');
        this._stepper.next();
      })
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const extension = file.name.split('.').pop();
    const filepath = `/uploads/sessions/${this.sessionComponent.selectedSession.getValue().id}/trainees/${this.filename}.${extension}`;
    const task = this.uploadService.uploadFile(filepath, file);

    //task.downloadURL().subscribe(url => this.downloadURL = url);
    task.percentageChanges().subscribe(percentage => this.percentageUploaded = percentage);
  }

  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  nextStep(): void {
    console.log('nextStep()')
    this._stepper.next();
  }
}
