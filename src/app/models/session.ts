export interface Session {
  id?: string;
  campId: string;
  enable: boolean;
  end: Date;
  endRegistrationDate: Date;
  fullBoardRates: number;
  halfBoardRates: number;
  numberOfRegistrationsInProgress: number;
  numberOfRegistrationsAccepted: number;
  numberOfRegistrationsRejected: number;
  maximumNumberOfRegistrations: number;
  start: Date;
}
