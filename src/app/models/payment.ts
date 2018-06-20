export interface Payment {
  id?: string;
  registrationId: string;
  stripeTokenId: number;
  // TODO status
}
