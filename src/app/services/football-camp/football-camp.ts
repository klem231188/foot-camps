export class FootballCamp {
  //- id
  id: number;

  //- GPS positioning
  latitude: number;
  longitude: number;
  ville: string;

  //- Overview data
  pathToImage: string;
  title: string;
  content: string;

  //- Details data
  pathToLogo : string;
  pathToGallery: string;

  sessions: Session[];
}


export class Session {
  name: string;
  fromDateToDate: string;
  fullBoardRates: number;
  halfBoardRates: number;

  constructor(name: string, fromDateToDate: string, fullBoardRates: number, halfBoardRates: number) {
    this.name = name;
    this.fromDateToDate = fromDateToDate;
    this.fullBoardRates = fullBoardRates;
    this.halfBoardRates = halfBoardRates;
  }
}
