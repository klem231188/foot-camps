import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';
import {FootballCamp} from '../../models/football-camp';

@Injectable()
export class FootballCampService {

  private footballCamps$: Observable<FootballCamp[]> = null;

  constructor(private angularFirestore: AngularFirestore) {
  }

  getFootballCamps(): Observable<FootballCamp[]> {
    if (this.footballCamps$ == null) {
      this.footballCamps$ = this.angularFirestore
        .collection<FootballCamp>('camps')
        .snapshotChanges()
        .map<DocumentChangeAction[], FootballCamp[]>(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as FootballCamp;
            data.id = action.payload.doc.id;
            return data as FootballCamp;
          });
        })
        .publishReplay(1) // Latest event is buffered and will be emit to new subscriber
        .refCount(); // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
    }

    return this.footballCamps$;
  }

  getFootballCamp(campId: string): Observable<FootballCamp> {
    return this.getFootballCamps()
      .map<FootballCamp[], FootballCamp>((footballCamps: FootballCamp[]) => {
          return footballCamps.find(footballCamp => {
            return campId === footballCamp.id;
          });
        }
      );
  }
}
