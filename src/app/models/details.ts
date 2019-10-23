import {Organizer} from './organizer';
import {Category} from './category.enum';
import {Link} from './link';

export interface Details {
  // - Logo
  pathToLogo: string;

  // - Description
  activityDescription: string;
  description: string;
  pathToSchedule: string;

  // - Documents
  documents: Link[];

  // - Location
  address: string;
  location: string;
  gmapsUrl: string;

  // - Organizers and sponsors
  organizerDescription: string;
  organizers: Organizer[];

  // - Gallery
  pathToGallery: string;

  // - Date and prices
  priceDescription: string;

  // - Registration
  useOnlineRegistration: boolean;
  registrationUrl: string;

  // - Categories
  categories: Category[];
}
