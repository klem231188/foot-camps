import {Session} from './session';
import {Organizer} from './organizer';

export class Details {
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
  sessions: Session[];

  // - Registration
  useOnlineRegistration: boolean;
  registrationUrl: string;

  constructor() {
  }

  withPathToLogo(value: string): Details {
    this.pathToLogo = value;
    return this;
  }

  withDescription(value: string): Details {
    this.description = value;
    return this;
  }

  withPathToSchedule(value: string): Details {
    this.pathToSchedule = value;
    return this;
  }

  withLocation(value: string): Details {
    this.location = value;
    return this;
  }

  withAddress(value: string): Details {
    this.address = value;
    return this;
  }

  withGmapsUrl(value: string): Details {
    this.gmapsUrl = value;
    return this;
  }

  withOrganizerDescription(value: string): Details {
    this.organizerDescription = value;
    return this;
  }

  withOrganizers(value: Organizer[]): Details {
    this.organizers = value;
    return this;
  }

  withPathToGallery(value: string): Details {
    this.pathToGallery = value;
    return this;
  }

  withSessions(value: Session[]): Details {
    this.sessions = value;
    return this;
  }

  withUseOnlineRegistration(value: boolean): Details {
    this.useOnlineRegistration = value;
    return this;
  }

  withRegistrationUrl(value: string): Details {
    this.registrationUrl = value;
    return this;
  }
}
