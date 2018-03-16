export interface Session {
  id?: string;
  campId: string;
  enable: boolean;
  end: Date;
  endRegistrationDate: Date;
  fullBoardRates: number;
  halfBoardRates: number;
  currentNumberOfRegistrations: number;
  maximumNumberOfRegistrations: number;
  start: Date;
}
