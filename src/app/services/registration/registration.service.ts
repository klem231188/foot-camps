import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Registration} from '../../models/registration';

@Injectable()
export class RegistrationService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  save(registration: Registration) {
      this.angularFirestore
        .collection<Registration>('registrations')
        .add(registration);
  }
}
