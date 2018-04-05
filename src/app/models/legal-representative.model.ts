import {Address} from './address.model';

export interface LegalRepresentative {
  firstname: string;
  lastname: string;
  address: Address;
  phoneNumber: string;
}
