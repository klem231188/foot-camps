import {PaymentState} from './payment-state.enum';
import {PaymentType} from './payment-type.enum';

export interface Payment {
  id?: string;
  registrationId: string;
  stripeTokenId: string;
  state: PaymentState;
  type: PaymentType;
}
