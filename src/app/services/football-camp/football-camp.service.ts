import {map, publishReplay, refCount} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';


import {FootballCamp} from '../../models/football-camp';

@Injectable()
export class FootballCampService {

  private footballCamps$: Observable<FootballCamp[]> = null;

  constructor(private angularFirestore: AngularFirestore) {
    angularFirestore.firestore.settings({timestampsInSnapshots: true});
  }

  getFootballCamps(): Observable<FootballCamp[]> {
    if (this.footballCamps$ == null) {
      this.footballCamps$ = this.angularFirestore
        .collection<FootballCamp>('camps')
        .snapshotChanges()
        .pipe(
          map<DocumentChangeAction<FootballCamp>[], FootballCamp[]>(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as FootballCamp;
              data.id = action.payload.doc.id;
              return data as FootballCamp;
            });
          }),
          publishReplay(1), // Latest event is buffered and will be emit to new subscriber
          refCount(), // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
        );
    }

    return this.footballCamps$;
  }

  getFootballCamp(campId: string): Observable<FootballCamp> {
    return this.getFootballCamps().pipe(
      map<FootballCamp[], FootballCamp>((footballCamps: FootballCamp[]) => {
          return footballCamps.find(footballCamp => {
            return campId === footballCamp.id;
          });
        }
      ));
  }
}
