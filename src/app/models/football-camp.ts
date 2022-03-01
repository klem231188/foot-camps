import {Overview} from './overview';
import {Details} from './details';
import {PaymentInfo} from './payment-info';
import {DocumentType} from './document-type.enum';

export interface FootballCamp {
  // - id
  id?: string;

  // - GPS positioning
  latitude: number;
  longitude: number;
  city: string;

  // - Price
  averagePrice: number;
  paymentInfo: PaymentInfo;

  // - Age
  minimumAge: number;
  maximumAge: number;

  // - Gender
  boysAccepted: boolean;
  girlsAccepted: boolean;

  // - Overview data
  overview: Overview;

  // - Details data
  details: Details;

  // - Registration documents
  registrationDocuments: DocumentType[];

  // - Contacts data
  // contacts: Contact[];
}
