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

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
  // Model to save data
  registration: Registration = new Registration();

  // Registration Form & Controls
  registrationForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  gender: FormControl;
  email: FormControl;

  // Payment From & Controls
  paymentFormGroup: FormGroup;

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
        if (selection.selectedIndex === 2) {
          this._stepper._steps.forEach((step) => step.editable = false);
          // HACK here --> https://github.com/firebase/firebase-js-sdk/issues/311
          this.registrationService.save(this.getRegistrationData());
        }
      })
    }
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService,
              private registrationService: RegistrationService,
              public angularFireAuth: AngularFireAuth,
              public dialog: MatDialog,
              private router: Router) {

    this._subscriptions = [];
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationComponent.ngOnInit()');
    this.firstname = new FormControl('Clément', [Validators.required, Validators.minLength(2)]);
    this.lastname = new FormControl('Tréguer', [Validators.required, Validators.minLength(2)]);
    this.gender = new FormControl('Male', [Validators.required]);
    this.email = new FormControl('clemtreguer@gmail.com', [Validators.required, Validators.email]);

    this.registrationForm = new FormGroup({
      'firstname': this.firstname,
      'lastname': this.lastname,
      'gender': this.gender,
      'email': this.email
    });
    this.paymentFormGroup = this.formBuilder.group({
      paymentController: ['', Validators.minLength(0)]
    });

    const routeSubscription = this.route
      .params
      .switchMap<Params, FootballCamp>((params) => {
        const id: string = params['id'];
        return this.footballCampService.getFootballCamp(id);
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp;
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

    this._subscriptions.push(routeSubscription);
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

  getRegistrationData(): object {
    const result = {};
    Object.keys(this.registration).map(key => result[key] = this[key]);
    return result;
  }
}
