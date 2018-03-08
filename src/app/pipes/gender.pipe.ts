import {Pipe, PipeTransform} from '@angular/core';
import {Feet} from '../models/feet.enum';
import {Gender} from '../models/gender.enum';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: Gender, args: string[]): any {
    if (!value) {
      return value;
    } else {
      switch (value) {
        case Gender.FEMALE:
          return 'Fille';
        case Gender.MALE:
          return 'Garçon';
        default:
          return null;
      }
    }
  }
}
