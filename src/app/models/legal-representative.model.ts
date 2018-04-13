import {Address} from './address.model';
import {HealthInsurance} from './health-insurance.model';

export interface LegalRepresentative {
  address: Address;
  firstname: string;
  healthInsurance: HealthInsurance;
  phoneNumber: string;
  lastname: string;
}
