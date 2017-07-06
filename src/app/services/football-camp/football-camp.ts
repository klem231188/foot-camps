export class FootballCamp {
  //- id
  id: number;

  //- GPS positioning
  latitude: number;
  longitude: number;
  city: string;

  //- Overview data
  overview: Overview;

  //- Details data
  details: Details;
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
  //- Logo
  pathToLogo: string;

  //- Descritpion
  description: string;
  planningUrl: string;

  //- Location
  address: string;
  location: string;
  gmapsUrl: string;

  //- Organizers and sponsors
  organizerDescription: string;
  organizers: Organizer[];

  //- Gallery
  pathToGallery: string;

  //- Date and prices
  sessions: Session[];

  //- Subscribe
  subscribeUrl: string;

  constructor() {
  }

  withPathToLogo(value: string) {
    this.pathToLogo = value;
    return this;
  }

  withDescription(value: string) {
    this.description = value;
    return this;
  }

  withPlanningUrl(value: string) {
    this.planningUrl = value;
    return this;
  }

  withLocation(value: string) {
    this.location = value;
    return this;
  }

  withAddress(value: string) {
    this.address = value;
    return this;
  }

  withGmapsUrl(value: string) {
    this.gmapsUrl = value;
    return this;
  }

  withOrganizerDescription(value: string) {
    this.organizerDescription = value;
    return this;
  }

  withOrganizers(value: Organizer[]) {
    this.organizers = value;
    return this;
  }

  withPathToGallery(value: string) {
    this.pathToGallery = value;
    return this;
  }

  withSessions(value: Session[]) {
    this.sessions = value;
    return this;
  }

  withSubscribeUrl(value: string) {
    this.subscribeUrl = value;
    return this;
  }
}

export class Organizer {
  name: string;
  pictureUrl: string;
  speech: string;

  constructor() {
  }

  withName(value: string): Organizer {
    this.name = value;
    return this;
  }

  withPictureUrl(value: string): Organizer {
    this.pictureUrl = value;
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
