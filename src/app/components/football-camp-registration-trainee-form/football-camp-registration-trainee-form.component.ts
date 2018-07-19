import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-football-camp-registration-trainee-form',
  templateUrl: './football-camp-registration-trainee-form.component.html',
  styleUrls: ['./football-camp-registration-trainee-form.component.scss']
})
export class FootballCampRegistrationTraineeFormComponent implements OnInit {

  // Fields
  @Output() isValid: Observable<boolean>;

  registrationForm: FormGroup;

  birthdate: FormControl;
  club: FormControl;
  email: FormControl;
  feet: FormControl;
  fieldPosition: FormControl;
  firstname: FormControl;
  gender: FormControl;

  lastname: FormControl;

  // Constructor
  constructor(private formBuilder: FormBuilder) {
  }

  // Lifecycle hooks
  ngOnInit() {
    this.birthdate = new FormControl(null, [Validators.required]);
    this.club = new FormControl(null, []);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.fieldPosition = new FormControl(null, [Validators.required]);
    this.feet = new FormControl(null, [Validators.required]);
    this.firstname = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.gender = new FormControl('', [Validators.required]);
    this.lastname = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.registrationForm = this.formBuilder.group({
      'birthdate': this.birthdate,
      'club': this.club,
      'email': this.email,
      'feet': this.feet,
      'fieldPosition': this.fieldPosition,
      'firstname': this.firstname,
      'gender': this.gender,
      'lastname': this.lastname
    });

    this.isValid = this.registrationForm.statusChanges.pipe(map(status => {
      return status === 'VALID';
    }));
  }

  // Methods
  getFirstnameError() {
    if (this.firstname.hasError('required')) {
      return 'Le prénom est obligatoire';
    } else if (this.firstname.hasError('minlength')) {
      return 'Le prénom doit avoir 2 caractères minimum';
    } else {
      return '';
    }
  }

  getLastnameError() {
    if (this.lastname.hasError('required')) {
      return 'Le nom est obligatoire';
    } else if (this.lastname.hasError('minlength')) {
      return 'Le nom doit avoir 2 caractères minimum';
    } else {
      return '';
    }
  }

  getBirthdateError() {
    if (this.birthdate.hasError('required')) {
      return 'La date de naissance est obligatoire';
    } else {
      return '';
    }
  }

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'L\'email est obligatoire';
    } else if (this.email.hasError('email')) {
      return 'L\'email est incorrect';
    } else {
      return '';
    }
  }

}
