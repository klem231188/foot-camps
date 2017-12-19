import {Component, OnInit, OnDestroy} from '@angular/core';
import {Registration} from './registration';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../services/football-camp/football-camp';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'football-camp-registration',
  templateUrl: './football-camp-registration.component.html',
  styleUrls: ['./football-camp-registration.component.scss']
})
export class FootballCampRegistrationComponent implements OnInit, OnDestroy {
  registration: Registration = new Registration();

  // Registration Form & Controls
  registrationForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;

  paymentFormGroup: FormGroup;

  footballCamp: FootballCamp;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.firstname = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.lastname = new FormControl('', [Validators.required, Validators.minLength(2)]);

    this.registrationForm = new FormGroup({
      'firstname': this.firstname,
      'lastname': this.lastname
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

  ngOnDestroy(): void {

  }

  onConfirmRegistration(): void {
    console.log(this.registration);
  }
}
