import {map, publishReplay, refCount} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {RegistrationV2} from '../../models/registration-v2.model';
import {RegistrationState} from '../../models/registration-state.enum';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  getRegistration(registrationId: string): Observable<RegistrationV2> {
    return this.angularFirestore
      .doc<RegistrationV2>(`registrations/${registrationId}`)
      .snapshotChanges()
      .pipe(
        map<Action<DocumentSnapshot<RegistrationV2>>, RegistrationV2>(action => {
          const data = action.payload.data();
          data.id = action.payload.id;
          return data;
        }),
        publishReplay(1), // Latest event is buffered and will be emit to new subscriber
        refCount()
      )
  }

  getRegistrations(sessionId: string): Observable<RegistrationV2[]> {
    return this.angularFirestore
      .collection<RegistrationV2>('registrations', ref => {
        return ref
          .where('sessionId', '==', sessionId)
          .where('state', 'in', [RegistrationState.ACCEPTED, RegistrationState.REJECTED, RegistrationState.IN_PROGRESS])
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

  save(registration: RegistrationV2): Promise<any> {
    return this.angularFirestore
      .collection('registrations')
      .add(registration)
      .then(documentReference => {
        registration.id = documentReference.id;
        return registration;
      });
  }

  update(registrationId: string, data: Partial<RegistrationV2>): Promise<any> {
    return this.angularFirestore
      .doc(`registrations/${registrationId}`)
      .update(data);
  }
}
