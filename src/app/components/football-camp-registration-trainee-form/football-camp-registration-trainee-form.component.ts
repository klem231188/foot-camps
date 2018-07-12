import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-football-camp-registration-trainee-form',
  templateUrl: './football-camp-registration-trainee-form.component.html',
  styleUrls: ['./football-camp-registration-trainee-form.component.scss']
})
export class FootballCampRegistrationTraineeFormComponent implements OnInit {

  // Fields
  registrationForm: FormGroup;

  birthdate: FormControl;
  firstname: FormControl;
  gender: FormControl;
  lastname: FormControl;

  // Constructor
  constructor(private formBuilder: FormBuilder) {
  }

  // Lifecycle hooks
  ngOnInit() {
    this.birthdate = new FormControl(null, [Validators.required]);
    this.firstname = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.gender = new FormControl('', [Validators.required]);
    this.lastname = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.registrationForm = this.formBuilder.group({
      'birthdate': this.birthdate,
      'firstname': this.firstname,
      'gender': this.gender,
      'lastname': this.lastname
    });
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
    if (this.lastname.hasError('required')) {
      return 'La date de naissance est obligatoire';
    } else {
      return '';
    }
  }

}
