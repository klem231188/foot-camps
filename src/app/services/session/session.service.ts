import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {FootballCamp} from '../../models/football-camp';
import {Session} from '../../models/session';

@Injectable()
export class SessionService {

  private sessions$: Observable<Session[]> = null;

  constructor(private angularFirestore: AngularFirestore) {
  }

  updateCurrentNumberOfRegistrations(session: Session): Promise<void> {
    return this.angularFirestore
      .doc(`sessions/${session.id}`)
      .update({
        'currentNumberOfRegistrations': (session.currentNumberOfRegistrations + 1)
      });
  }

  getSessions(): Observable<Session[]> {
    if (this.sessions$ == null) {
      this.sessions$ = this.angularFirestore
        .collection<Session>('sessions')
        .snapshotChanges()
        .map<DocumentChangeAction[], Session[]>(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Session;
            data.id = action.payload.doc.id;
            return data as Session;
          });
        })
        .publishReplay(1) // Latest event is buffered and will be emit to new subscriber
        .refCount(); // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
    }

    return this.sessions$;
  }

  getSessionsFromCampId(campId: string): Observable<Session[]> {
    return this.getSessions()
      .map<Session[], Session[]>((sessions: Session[]) => {
          return sessions.filter(session => {
            return campId === session.campId;
          });
        }
      );
  }

}
