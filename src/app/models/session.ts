import * as firebase from 'firebase';

export interface Session {
  id?: string;
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
