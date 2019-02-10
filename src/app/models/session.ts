import * as firebase from 'firebase';
import {PaymentType} from './payment-type.enum';

export interface Session {
  id?: string;
  acceptedPaymentTypes: PaymentType[];
  campId: string;
  enable: boolean;
  end: any; // firebase.firestore.Timestamp
  endRegistrationDate: any; // firebase.firestore.Timestamp
  fullBoardRates: number;
  halfBoardRates: number;
  numberOfRegistrationsInProgress: number;
  numberOfRegistrationsAccepted: number;
  numberOfRegistrationsRejected: number;
  maximumNumberOfRegistrations: number;
  start: any; // firebase.firestore.Timestamp
}
