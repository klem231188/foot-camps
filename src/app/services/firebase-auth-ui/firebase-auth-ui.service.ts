import {Injectable} from '@angular/core';
import * as firebaseui from 'firebaseui';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class FirebaseAuthUiService {

  private authUI: firebaseui.auth.AuthUI = null;

  constructor(
    private angularFireAuth: AngularFireAuth
  ) {
    this.authUI = new firebaseui.auth.AuthUI(this.angularFireAuth.auth);
   }

  getAuthUi(): firebaseui.auth.AuthUI {
    return this.authUI;
  }
}
