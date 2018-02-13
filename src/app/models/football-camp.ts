import {Overview} from './overview';
import {Details} from './details';
import {Contact} from './contact';

export interface FootballCamp {
  // - id
  id?: string;

  // - GPS positioning
  latitude: number;
  longitude: number;
  city: string;

  // - Overview data
  overview: Overview;

  // - Details data
  details: Details;

  // - Contacts data
  //contacts: Contact[];
}
