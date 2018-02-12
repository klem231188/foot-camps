import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user';

@Injectable()
export class UserService {

  private user$: Observable<User> = null;

  constructor(private angularFirestore: AngularFirestore) {
  }

  getUser(uid): Observable<User> {
    if (this.user$ == null) {
      this.user$ = this.angularFirestore
        .doc<User>(`users/${uid}`)
        .valueChanges()
        .publishReplay(1) // Latest event is buffered and will be emit to new subscriber
        .refCount(); // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
    }

    return this.user$;
  }

}
