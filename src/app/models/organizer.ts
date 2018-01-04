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
