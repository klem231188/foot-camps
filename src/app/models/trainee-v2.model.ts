import {Gender} from './gender.enum';
import {Feet} from './feet.enum';
import {FieldPosition} from './field-position.enum';
import * as firebase from 'firebase';
import {Category} from './category.enum';

export interface TraineeV2 {
  firstname: string;
  lastname: string;
  gender: Gender;
  birthdate: firebase.firestore.Timestamp;
  email: string;
  club?: string;
  category?: Category;
  fieldPosition?: FieldPosition;
  feet?: Feet;
  // TODO : add shirtSize {8A, 10A, 12A, 14A, S, M, L, XL}
  // TODO : add shoeSize  {32-34, 35-37, 38-40, 41-43, 44-46}
}
