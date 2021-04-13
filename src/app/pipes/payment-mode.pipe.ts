import {Pipe, PipeTransform} from '@angular/core';
import {PaymentType} from '../models/payment-type.enum';
import {PaymentMode} from '../models/payment-mode.enum';

@Pipe({
  name: 'paymentMode'
})
export class PaymentModePipe implements PipeTransform {

  transform(value: PaymentMode, ...args: any[]): any {
    if (!value) {
      return 'Inconnu';
    } else {
      switch (value) {
        case PaymentMode.ONLINE:
          return 'Paiement en ligne';
        case PaymentMode.BY_MAIL:
          return 'Paiement par courrier';
        case PaymentMode.IN_PERSON:
          return 'Paiement en main propre';
        default:
          return 'Inconnu';
      }
    }
  }
}
