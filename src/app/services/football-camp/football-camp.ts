export class FootballCamp {
  // - id
  id: string;

  // - GPS positioning
  latitude: number;
  longitude: number;
  city: string;

  // - Overview data
  overview: Overview;

  // - Details data
  details: Details;

  // - Contacts data
  contacts: Contact[];
}

export class Overview {
  pathToImage: string;
  title: string;
  content: string;

  constructor() {
  }

  withPathToImage(value: string) {
    this.pathToImage = value;
    return this;
  }

  withTitle(value: string) {
    this.title = value;
    return this;
  }

  withContent(value: string) {
    this.content = value;
    return this;
  }
}

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

export class Organizer {
  name: string;
  pathToPicture: string;
  speech: string;

  constructor() {
  }

  withName(value: string): Organizer {
    this.name = value;
    return this;
  }

  withPathToPicture(value: string): Organizer {
    this.pathToPicture = value;
    return this;
  }

  withSpeech(value: string): Organizer {
    this.speech = value;
    return this;
  }
}

export class Session {
  name: string;
  fromDateToDate: string;
  fullBoardRates: number;
  halfBoardRates: number;

  constructor() {
  }

  withName(value: string): Session {
    this.name = value;
    return this;
  }

  withFromDateToDate(value: string): Session {
    this.fromDateToDate = value;
    return this;
  }

  withFullBoardRates(value: number): Session {
    this.fullBoardRates = value;
    return this;
  }

  withHalfBoardRates(value: number): Session {
    this.halfBoardRates = value;
    return this;
  }
}

export class Contact {
  firstname: string;
  lastname: string;
  pathToPicture: string;
  phoneNumber: string;

  constructor() {
  }

  withFirstname(value: string): Contact {
    this.firstname = value;
    return this;
  }

  withLastname(value: string): Contact {
    this.lastname = value;
    return this;
  }

  withPathToPicture(value: string): Contact {
    this.pathToPicture = value;
    return this;
  }

  withPhoneNumber(value: string): Contact {
    this.phoneNumber = value;
    return this;
  }
}
