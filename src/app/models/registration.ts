import {Gender} from './gender.enum';
import {Feet} from './feet.enum';
import {FieldPosition} from './field-position.enum';

export interface Registration {
  address: string;
  birthdate: Date;
  club: string;
  email: string;
  feet: Feet;
  fieldPosition: FieldPosition;
  firstname: string;
  gender: Gender;
  id?: string;
  lastname: string;
  sessionId: string;
}
