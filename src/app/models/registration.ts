import {Gender} from './gender.enum';
import {Feet} from './feet.enum';
import {FieldPosition} from './field-position.enum';

export class Registration {
  birthdate: Date = null;
  email = '';
  firstname = '';
  gender: Gender = null;
  lastname = '';
  address = '';
  club = '';
  fieldPosition: FieldPosition = null;
  feet: Feet = null;

  constructor() {
  }
}


