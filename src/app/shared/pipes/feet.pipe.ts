import {Pipe, PipeTransform} from '@angular/core';
import {Feet} from '../../models/feet.enum';

@Pipe({
  name: 'feet'
})
export class FeetPipe implements PipeTransform {

  transform(value: Feet, ...args: any[]): any {
    if (!value) {
      return value;
    } else {
      switch (value) {
        case Feet.LEFT_FOOTED:
          return 'Gaucher';
        case Feet.RIGHT_FOOTED:
          return 'Droitier';
        default:
          return null;
      }
    }
  }
}
