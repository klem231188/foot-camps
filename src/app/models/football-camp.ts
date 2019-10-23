import {Overview} from './overview';
import {Details} from './details';

export interface FootballCamp {
  // - id
  id?: string;

  // - GPS positioning
  latitude: number;
  longitude: number;
  city: string;

  // - Price
  averagePrice: number;

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

  // - Contacts data
  // contacts: Contact[];
}
