import {Pipe, PipeTransform} from '@angular/core';
import {FieldPosition} from 'app/models/field-position.enum';

@Pipe({
  name: 'fieldPosition'
})
export class FieldPositionPipe implements PipeTransform {

  transform(value: FieldPosition, ...args: any[]): any {
    if (!value) {
      return value;
    } else {
      switch (value) {
        case FieldPosition.DEFENDER:
          return 'Défenseur';
        case FieldPosition.GOALKEEPER:
          return 'Gardien';
        case FieldPosition.MIDFIELDER:
          return 'Milieu de terrain';
        case FieldPosition.STRIKER:
          return 'Attaquant';
        default:
          return null;
      }
    }
  }
}
