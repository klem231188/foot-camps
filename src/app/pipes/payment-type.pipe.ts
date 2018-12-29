import {Pipe, PipeTransform} from '@angular/core';
import {PaymentType} from '../models/payment-type.enum';

@Pipe({
  name: 'paymentType'
})
export class PaymentTypePipe implements PipeTransform {

  transform(value: PaymentType, args: string[]): any {
    if (!value) {
      return value;
    } else {
      switch (value) {
        case PaymentType.CARD:
          return 'Carte';
        case PaymentType.CHECK:
          return 'Chèque';
        default:
          return null;
      }
    }
  }
}
