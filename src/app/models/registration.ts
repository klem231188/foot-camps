import {Gender} from './gender.enum';
import {Feet} from './feet.enum';
import {FieldPosition} from './field-position.enum';

export class Registration {
  sessionId: string = null;
  birthdate: Date = null;
  email: string = null;
  firstname: string = null;
  gender: Gender = null;
  lastname: string = null;
  address: string = null;
  club: string = null;
  fieldPosition: FieldPosition = null;
  feet: Feet = null;

  constructor() {
  }
}


