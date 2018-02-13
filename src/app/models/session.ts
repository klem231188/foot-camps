export interface Session {
  id?: string;
  campId: string;
  enable: boolean;
  end: Date;
  fullBoardRates: number;
  halfBoardRates: number;
  currentNumberOfRegistrations: number;
  maximumNumberOfRegistrations: number;
  start: Date;
}
