import {Address} from './address.model';
import {Gender} from './gender.enum';
import {Feet} from './feet.enum';
import {FieldPosition} from './field-position.enum';
import * as firebase from 'firebase';

export interface Trainee {
  address: Address;
  birthdate: firebase.firestore.Timestamp;
  club: string;
  email: string;
  feet: Feet;
  fieldPosition: FieldPosition;
  firstname: string;
  gender: Gender;
  lastname: string;
  photoURL: string;

  // TODO : add shirtSize {8A, 10A, 12A, 14A, S, M, L, XL}
  // TODO : add shoeSize  {32-34, 35-37, 38-40, 41-43, 44-46}
  // TODO : add category  {Débutant, ...}
}
