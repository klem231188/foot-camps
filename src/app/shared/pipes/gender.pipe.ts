import {Pipe, PipeTransform} from '@angular/core';
import {Gender} from '../../models/gender.enum';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: Gender, ...args: any[]): any {
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
