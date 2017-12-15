import {Component, OnInit, OnDestroy} from '@angular/core';
import {Registration} from './registration';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../services/football-camp/football-camp';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit, OnDestroy {
  startDate: Date = new Date(2000, 0, 1);
  registration: Registration = new Registration();
  isLinear = true;
  registrationFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  footballCamp: FootballCamp;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.registrationFormGroup = this.formBuilder.group({
      registrationController: ['', Validators.minLength(0)]
    });
    this.paymentFormGroup = this.formBuilder.group({
      paymentController: ['', Validators.required]
    });

    this.route
      .params
      .switchMap((params: Params) => {
        const id: number = +params['id'];
        return this.footballCampService.getFootballCamp(id);
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp;
      });
  }

  ngOnDestroy(): void {

  }

  onConfirmRegistration(): void {
    console.log(this.registration);
  }
}
