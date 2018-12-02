import {PaymentState} from './payment-state.enum';

export interface Payment {
  id?: string;
  registrationId: string;
  stripeTokenId: string;
  state: PaymentState;
}
