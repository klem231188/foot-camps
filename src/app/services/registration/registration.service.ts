import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Registration} from '../../models/registration';

@Injectable()
export class RegistrationService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  save(registration: Registration) {
    // HACK here --> https://github.com/firebase/firebase-js-sdk/issues/311
    this.angularFirestore
      .collection('registrations')
      .add(this.getData(registration));
  }

  getData(clazz: any): object {
    const result = {};
    Object.keys(clazz).map(key => result[key] = clazz[key]);
    return result;
  }
}
