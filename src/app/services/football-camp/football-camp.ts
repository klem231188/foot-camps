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
  description : string;
  linkToPlanning: string;
  pathToLogo: string;
  pathToGallery: string;
  sessions: Session[];

  constructor() {
  }

  withDescription(value: string) {
    this.description = value;
    return this;
  }

  withLinkToPlanning(value: string) {
    this.linkToPlanning = value;
    return this;
  }

  withPathToLogo(value: string) {
    this.pathToLogo = value;
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
