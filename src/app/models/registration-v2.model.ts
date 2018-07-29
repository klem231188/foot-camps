import {Document} from './document.model';
import {TraineeV2} from './trainee-v2.model';

export interface RegistrationV2 {
  // session
  sessionId: string;

  // trainee information
  trainee: TraineeV2;

  // documents uploaded
  documents: Document[];

  // payment

  // other
  id?: string;
}
