import {publishReplay, map, refCount} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Registration} from '../../models/registration';

@Injectable()
export class RegistrationService {

  private registrations$: Observable<Registration[]> = null;

  constructor(private angularFirestore: AngularFirestore) {
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

  getRegistrations(sessionId: string): Observable<Registration[]> {
    return this.angularFirestore
      .collection<Registration>('registrations', ref => {
        return ref.where('sessionId', '==', sessionId)
      })
      .snapshotChanges().pipe(
        map<DocumentChangeAction[], Registration[]>(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Registration;
            data.id = action.payload.doc.id;
            return data as Registration;
          });
        }),
        publishReplay(1), // Latest event is buffered and will be emit to new subscriber
        refCount() // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
      )
  }
}
