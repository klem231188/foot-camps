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
