import {PaymentType} from './payment-type.enum';
import {PaymentMode} from './payment-mode.enum';
import {PriceInfo} from './price-info';

export interface PaymentInfo {
  acceptedPaymentModes: PaymentMode[];
  acceptedPaymentTypes: PaymentType[];
  accountId: string;
  averagePrice: number;
  checkReceiver: string;
  feeAmount: number;
  prices: PriceInfo;
  paymentAddress: string;
  reducedPriceCondition: string;
}
