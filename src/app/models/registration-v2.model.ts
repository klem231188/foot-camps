import {Document} from './document.model';
import {TraineeV2} from './trainee-v2.model';
import {RegistrationState} from './registration-state.enum';

export interface RegistrationV2 {
  // session
  sessionId: string;

  // trainee information
  trainee: TraineeV2;

  // documents uploaded
  documents: Document[];

  // payment
  paymentId: string;

  // other
  id?: string;
  state: RegistrationState;
}
