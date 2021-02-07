import {PaymentState} from './payment-state.enum';
import {PaymentType} from './payment-type.enum';

export interface Payment {
  id?: string;
  registrationId: string;
  state: PaymentState;
  type: PaymentType;
  reducedPrice: boolean;
  halfBoard: boolean;
}
