import { Component, OnInit } from '@angular/core';
import { Registration } from './registration';

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit {

  startDate: Date = new Date(2000, 0, 1);

  registration: Registration = new Registration();

  constructor() { }

  ngOnInit() {
  }

  onConfirmRegistration(): void {
    console.log(this.registration);
  }
}
