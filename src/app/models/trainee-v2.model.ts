import {Gender} from './gender.enum';
import {Feet} from './feet.enum';
import {FieldPosition} from './field-position.enum';
import {Category} from './category.enum';
import {ShortSize} from './short-size.enum';

export interface TraineeV2 {
  birthdate: any; // firebase.firestore.Timestamp
  category?: Category;
  club?: string;
  email: string;
  feet?: Feet;
  fieldPosition?: FieldPosition;
  firstname: string;
  gender: Gender;
  lastname: string;
  shoeSize?: number;
  shortSize?: ShortSize;
}
