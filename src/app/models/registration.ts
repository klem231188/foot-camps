import {Gender} from './gender.enum';
import {Feet} from './feet.enum';
import {FieldPosition} from './field-position.enum';
import {RegistrationState} from './registration-state.enum';
import {LegalRepresentative} from './legal-representative.model';

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
  legalRepresentative: LegalRepresentative;
  photoURL: string;
  sessionId: string;
  state: RegistrationState
}
