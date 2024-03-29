import {map, publishReplay, refCount} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';


import {FootballCamp} from '../../models/football-camp';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FootballCampService {

  private footballCamps$: Observable<FootballCamp[]> = null;

  constructor(private angularFirestore: AngularFirestore) {
    // angularFirestore.firestore.settings({timestampsInSnapshots: true});
  }

  getFootballCamp(campId: string): Observable<FootballCamp> {
    return this.getFootballCamps()
      .pipe(
        map<FootballCamp[], FootballCamp>((footballCamps: FootballCamp[]) => {
            return footballCamps.find(footballCamp => {
              return campId === footballCamp.id;
            });
          }
        ));
  }

  getFootballCamps(): Observable<FootballCamp[]> {
    if (this.footballCamps$ == null) {
      this.footballCamps$ = this.angularFirestore
        .collection<FootballCamp>('camps')
        .valueChanges({ idField: 'id' })
        .pipe(
          map(footballCamps => _.orderBy(footballCamps, [fc => fc.id.toLowerCase()], ['desc'])),
          publishReplay(1), // Latest event is buffered and will be emitted to new subscriber
          refCount(), // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
        );
    }

    return this.footballCamps$;
  }
}
