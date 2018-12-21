import {map, publishReplay, refCount} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Registration} from '../../models/registration';
import {RegistrationV2} from '../../models/registration-v2.model';

@Injectable()
export class RegistrationService {

  private registrations$: Observable<Registration[]> = null;

  constructor(private angularFirestore: AngularFirestore) {
    angularFirestore.firestore.settings({ timestampsInSnapshots: true });
  }

  save2(registration: RegistrationV2): Promise<any> {
    return this.angularFirestore
      .collection('registrations')
      .add(registration)
      .then(documentReference => {
        registration.id = documentReference.id;
        return registration;
      })
  }

  save(registration: Registration): Promise<any> {
    return this.angularFirestore
      .collection('registrations')
      .add(registration);
  }

  update(registration: Registration, data: Partial<Registration>): Promise<any> {
    return this.angularFirestore
      .doc(`registrations/${registration.id}`)
      .update(data);
  }

  getRegistrations(sessionId: string): Observable<RegistrationV2[]> {
    return this.angularFirestore
      .collection<RegistrationV2>('registrations', ref => {
        return ref.where('sessionId', '==', sessionId)
      })
      .snapshotChanges().pipe(
        map<DocumentChangeAction<RegistrationV2>[], RegistrationV2[]>(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as RegistrationV2;
            data.id = action.payload.doc.id;
            return data as RegistrationV2;
          });
        }),
        publishReplay(1), // Latest event is buffered and will be emit to new subscriber
        refCount() // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
      )
  }
}
