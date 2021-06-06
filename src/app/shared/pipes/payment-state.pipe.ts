import {Pipe, PipeTransform} from '@angular/core';
import {PaymentState} from '../../models/payment-state.enum';

@Pipe({
  name: 'paymentState'
})
export class PaymentStatePipe implements PipeTransform {

  transform(value: PaymentState, ...args: any[]): any {
    if (!value) {
      return value;
    } else {
      switch (value) {
        case PaymentState.IN_PROGRESS:
          return 'En cours';
        case PaymentState.ACCEPTED:
          return 'Acceptée';
        case PaymentState.REJECTED:
          return 'Refusée';
        default:
          return null;
      }
    }
  }
}
