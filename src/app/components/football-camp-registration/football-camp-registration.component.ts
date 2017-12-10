import { Component, OnInit } from '@angular/core';
import { Registration } from './registration';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit {
  startDate: Date = new Date(2000, 0, 1);
  registration: Registration = new Registration();
  isLinear = true;
  registrationFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationFormGroup = this.formBuilder.group({
      registrationController: ['', Validators.required]
    });
    this.paymentFormGroup = this.formBuilder.group({
      paymentController: ['', Validators.required]
    });
  }

  onConfirmRegistration(): void {
    console.log(this.registration);
  }
}
