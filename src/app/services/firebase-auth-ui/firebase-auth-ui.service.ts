import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from 'angularfire2/auth';

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
