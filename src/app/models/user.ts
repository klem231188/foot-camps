import {Role} from './role.enum';

export interface User {
  admin: boolean;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  role: Role;
  campId?: string;
  uid: string;
}
