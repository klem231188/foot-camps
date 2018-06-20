import {map, publishReplay, refCount} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Session} from '../../models/session';

@Injectable()
export class SessionService {

  private sessions$: Observable<Session[]> = null;

  constructor(private angularFirestore: AngularFirestore) {
  }

  update(session: Session, data: Partial<Session>): Promise<any> {
    return this.angularFirestore
      .doc(`sessions/${session.id}`)
      .update(data);
  }


  getSessions(): Observable<Session[]> {
    if (this.sessions$ == null) {
      this.sessions$ = this.angularFirestore
        .collection<Session>('sessions')
        .snapshotChanges().pipe(
          map<DocumentChangeAction<Session>[], Session[]>(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Session;
              data.id = action.payload.doc.id;
              return data as Session;
            });
          }),
          publishReplay(1), // Latest event is buffered and will be emit to new subscriber
          refCount() // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
        )
    }

    return this.sessions$;
  }

  getSessionsFromCampId(campId: string): Observable<Session[]> {
    return this.getSessions().pipe(
      map<Session[], Session[]>((sessions: Session[]) => {
          return sessions.filter(session => {
            return campId === session.campId;
          });
        }
      ));
  }

}
