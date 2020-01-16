import {PaymentType} from './payment-type.enum';

export interface PaymentInfo {
  acceptedPaymentTypes: PaymentType[];
  averagePrice: number;
  paymentAddress: string;
  checkReceiver: string;
}
