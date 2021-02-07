import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable()
export class UserService {

  private user$: Observable<User> = null;

  constructor(private angularFirestore: AngularFirestore) {
    // angularFirestore.firestore.settings({ timestampsInSnapshots: true });
  }

  getUser(uid): Observable<User> {
    if (this.user$ == null) {
      this.user$ = this.angularFirestore
        .doc<User>(`users/${uid}`)
        .valueChanges()
        .pipe(
          publishReplay(1), // Latest event is buffered and will be emit to new subscriber
          refCount() // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
        )
    }

    return this.user$;
  }

  addUser(user: User): Promise<void> {
    return this.angularFirestore
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        console.log(user.toString() + ' has been saved to database');
        //TODO : Trigger mail when user subscribe
      })
      .catch(error => {
        console.log('something goes wrong saving user in database ' + error)
      });
  }

}
