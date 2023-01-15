import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {FieldPosition} from '../../../../models/field-position.enum';
import * as moment from 'moment';
import {Feet} from '../../../../models/feet.enum';
import {Gender} from '../../../../models/gender.enum';
import {ShortSize} from '../../../../models/short-size.enum';

@Component({
  selector: 'app-step-trainee-form',
  templateUrl: './step-trainee-form.component.html',
  styleUrls: ['./step-trainee-form.component.scss']
})
export class StepTraineeFormComponent implements OnInit {

  @Input() mocked = false;
  @Output() isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  birthdate: FormControl;
  club: FormControl;
  email: FormControl;
  feet: FormControl;
  fieldPosition: FormControl;
  firstname: FormControl;
  gender: FormControl;
  lastname: FormControl;
  registrationForm: FormGroup;
  shoeSize: FormControl;
  shortSize: FormControl;

  constructor(private formBuilder: FormBuilder) {
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
      return 'L\' email est obligatoire';
    } else if (this.email.hasError('email')) {
      return 'L\' email est incorrect';
    } else {
      return '';
    }
  }

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

  getFieldPositionError() {
    if (this.fieldPosition.hasError('required')) {
      return 'Le poste est obligatoire';
    } else {
      return '';
    }
  }

  getFeetError() {
    if (this.feet.hasError('required')) {
      return 'Le pied est obligatoire';
    } else {
      return '';
    }
  }

  getGenderError() {
    if (this.gender.hasError('required')) {
      return 'Le genre est obligatoire';
    } else {
      return '';
    }
  }

  getShoeSizeError() {
    if (this.shoeSize.hasError('required')) {
      return 'La pointure est obligatoire';
    } else if (this.shoeSize.hasError('min')) {
      return 'La pointure doit être un nombre positif';
    } else {
      return '';
    }
  }

  getShortSizeError() {
    if (this.shortSize.hasError('required')) {
      return 'La taille du maillot est obligatoire';
    } else {
      return '';
    }
  }

  ngOnInit() {
    console.log('StepTraineeFormComponent.ngOnInit()')

    const vBirthdate = (this.mocked) ? moment('2010-11-23') : null;
    const vClub = (this.mocked) ? 'Stade Brestois 29' : null;
    const vEmail = (this.mocked) ? 'my@mail.com' : null;
    const vFieldPosition = (this.mocked) ? FieldPosition.MIDFIELDER : null;
    const vFeet = (this.mocked) ? Feet.RIGHT_FOOTED : null;
    const vFirstname = (this.mocked) ? 'Patrik' : null;
    const vGender = (this.mocked) ? Gender.MALE : null;
    const vLastname = (this.mocked) ? 'Schick' : null;
    const vShoeSize = (this.mocked) ? 35 : null;
    const vShortSize = (this.mocked) ? ShortSize.M : null;

    this.birthdate = new FormControl(vBirthdate, [Validators.required]);
    this.club = new FormControl(vClub, []);
    this.email = new FormControl(vEmail, [Validators.required, Validators.email]);
    this.fieldPosition = new FormControl(vFieldPosition, [Validators.required]);
    this.feet = new FormControl(vFeet, [Validators.required]);
    this.firstname = new FormControl(vFirstname, [Validators.required, Validators.minLength(2)]);
    this.gender = new FormControl(vGender, [Validators.required]);
    this.lastname = new FormControl(vLastname, [Validators.required, Validators.minLength(2)]);
    this.shoeSize = new FormControl(vShoeSize, [Validators.required, Validators.min(0)]);
    this.shortSize = new FormControl(vShortSize, [Validators.required]);
    this.registrationForm = this.formBuilder.group({
      'birthdate': this.birthdate,
      'club': this.club,
      'email': this.email,
      'feet': this.feet,
      'fieldPosition': this.fieldPosition,
      'firstname': this.firstname,
      'gender': this.gender,
      'lastname': this.lastname,
      'shoeSize': this.shoeSize,
      'shortSize': this.shortSize,
    });

    this.registrationForm.statusChanges
      .pipe(
        map(status => {
          this.isValid.next(status === 'VALID');
        })
      ).subscribe();
  }

}
