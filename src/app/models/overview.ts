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
