import {Role} from './role.enum';

export interface User {
  campId?: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  role: Role;
  uid: string;
}
