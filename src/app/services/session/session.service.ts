import {map, publishReplay, refCount} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Session} from '../../models/session';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessions$: Observable<Session[]> = null;

  constructor(private angularFirestore: AngularFirestore) {
    // angularFirestore.firestore.settings({timestampsInSnapshots: true});
  }

  getSession(sessionId: string): Observable<Session> {
    return this.angularFirestore
      .doc<Session>(`sessions/${sessionId}`)
      .valueChanges();
  }

  getSessions(): Observable<Session[]> {
    console.log('getSessions()');

    if (this.sessions$ == null) {
      this.sessions$ = this.angularFirestore
        .collection<Session>('sessions')
        .snapshotChanges()
        .pipe(
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
    console.log(`getSessionsFromCampId(${campId})`);
    return this.getSessions()
      .pipe(
        map<Session[], Session[]>((sessions: Session[]) => {
          return sessions
            .filter(session => campId === session.campId)
            .sort((s1, s2) => {
              const d1: Date = (s1.end as Timestamp).toDate();
              const d2: Date = (s2.end as Timestamp).toDate();
              return d1.getTime() - d2.getTime();
            });
        })
      );
  }

  update(session: Session, data: Partial<Session>): Promise<any> {
    return this.angularFirestore
      .doc(`sessions/${session.id}`)
      .update(data);
  }
}
