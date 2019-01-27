import * as firebase from 'firebase';
import {PaymentType} from './payment-type.enum';

export interface Session {
  id?: string;
  acceptedPaymentTypes: PaymentType[];
  campId: string;
  enable: boolean;
  end: firebase.firestore.Timestamp;
  endRegistrationDate: firebase.firestore.Timestamp;
  fullBoardRates: number;
  halfBoardRates: number;
  numberOfRegistrationsInProgress: number;
  numberOfRegistrationsAccepted: number;
  numberOfRegistrationsRejected: number;
  maximumNumberOfRegistrations: number;
  start: firebase.firestore.Timestamp;
}
