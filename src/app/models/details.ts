import {Organizer} from './organizer';
import {Category} from './category.enum';

export interface Details {
  // - Logo
  pathToLogo: string;

  // - Description
  description: string;
  pathToSchedule: string;

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
  // sessions: Session[];

  // - Registration
  useOnlineRegistration: boolean;
  registrationUrl: string;

  // - Categories
  categories: Category[];
}
