import {PaymentState} from './payment-state.enum';
import {PaymentType} from './payment-type.enum';
import {PaymentMode} from './payment-mode.enum';

export interface Payment {
  id?: string;
  registrationId: string;
  state: PaymentState;
  type: PaymentType;
  mode: PaymentMode;
  reducedPrice: boolean;
  halfBoard: boolean;
}
