import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {Registration} from './registration';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../services/football-camp/football-camp';
import {ActivatedRoute, Params} from '@angular/router';
import {MatVerticalStepper} from '@angular/material';

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
  startDate: Date = new Date(2000, 0, 1);
  registration: Registration = new Registration();
  registrationFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  footballCamp: FootballCamp;

  @ViewChild('stepper') stepper: MatVerticalStepper;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.registrationFormGroup = this.formBuilder.group({
      registrationController: ['', Validators.minLength(0)]
    });
    this.paymentFormGroup = this.formBuilder.group({
      paymentController: ['', Validators.minLength(0)]
    });

    this.route
      .params
      .switchMap((params: Params) => {
        const id: number = +params['id'];
        return this.footballCampService.getFootballCamp(id);
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp;
        setTimeout(() => {
          this.stepper.selectionChange.asObservable().subscribe((selection) => {
            if (selection.selectedIndex === 2) {
              this.stepper._steps.forEach((step) => step.editable = false);
            }
          })
        }, 10);
      });
  }

  ngAfterViewInit(): void {
    // console.log(this.theStepper)
    // this.theStepper.selectionChange.asObservable().subscribe(event => {console.log(event)})
  }

  ngOnDestroy(): void {

  }

  onConfirmRegistration(): void {
    console.log(this.registration);
  }
}
