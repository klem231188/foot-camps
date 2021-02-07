import {PaymentType} from './payment-type.enum';
import {PaymentMode} from './payment-mode.enum';
import {PriceInfo} from './price-info';

export interface PaymentInfo {
  acceptedPaymentModes: PaymentMode[];
  acceptedPaymentTypes: PaymentType[];
  averagePrice: number;
  checkReceiver: string;
  prices: PriceInfo;
  paymentAddress: string;
}
