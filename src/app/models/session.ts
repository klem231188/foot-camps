import {PaymentType} from './payment-type.enum';
import {PriceInfo} from './price-info';

export interface Session {
  id?: string;
  acceptedPaymentTypes: PaymentType[];
  campId: string;
  enable: boolean;
  end: any; // firebase.firestore.Timestamp
  endRegistrationDate: any; // firebase.firestore.Timestamp
  fullBoardRates: number;
  halfBoardRates: number;
  fullBoardReducedRates: number;
  halfBoardReducedRates: number;
  maximumNumberOfRegistrations: number;
  numberOfRegistrationsInProgress: number;
  numberOfRegistrationsAccepted: number;
  numberOfRegistrationsRejected: number;
  prices: PriceInfo;
  start: any; // firebase.firestore.Timestamp
}
