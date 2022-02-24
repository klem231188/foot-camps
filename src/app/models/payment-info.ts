import {PaymentType} from './payment-type.enum';
import {PaymentMode} from './payment-mode.enum';

export interface PaymentInfo {
  acceptedPaymentModes: PaymentMode[];
  acceptedPaymentTypes: PaymentType[];
  accountId: string;
  averagePrice: number;
  checkReceiver: string;
  paymentAddress: string;
  reducedPriceCondition: string;
}
