import {Gender} from './gender.enum';
import {Feet} from './feet.enum';
import {FieldPosition} from './field-position.enum';

export interface Registration {
  sessionId: string;
  birthdate: Date;
  email: string;
  firstname: string;
  gender: Gender;
  lastname: string;
  address: string;
  club: string;
  fieldPosition: FieldPosition;
  feet: Feet;
}


