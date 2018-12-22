import {Pipe, PipeTransform} from '@angular/core';
import {RegistrationState} from '../models/registration-state.enum';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {

  transform(value: RegistrationState, args: string[]): any {
    if (!value) {
      return value;
    } else {
      switch (value) {
        case RegistrationState.WAITING_APPROVAL:
          return 'En attente d\'approbation';
        case RegistrationState.IN_PROGRESS:
          return 'En cours';
        case RegistrationState.ACCEPTED:
          return 'Acceptée';
        case RegistrationState.REJECTED:
          return 'Refusée';
        default:
          return null;
      }
    }
  }
}
