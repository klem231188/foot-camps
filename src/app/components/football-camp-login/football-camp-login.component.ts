import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from 'angularfire2/auth';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-football-camp-login',
  templateUrl: './football-camp-login.component.html',
  styleUrls: ['./football-camp-login.component.scss']
})
export class FootballCampLoginComponent implements OnInit, AfterViewInit, OnDestroy {

  private authUI: firebaseui.auth.AuthUI = null;

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        console.log("logged !")
        console.log(firebaseUser);
      } else {
        console.log("not logged");
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.authUI) {
      // FirebaseUI config.
      const uiConfig = {
        //signInSuccessUrl: '/locate',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        signInFlow: 'popup',
        // Terms of service url.
        tosUrl: '/tos.html'
      };
      // Initialize the FirebaseUI Widget using Firebase.
      this.authUI = new firebaseui.auth.AuthUI(this.afAuth.auth);
      // The start method will wait until the DOM is loaded.
      setTimeout(() => { this.authUI.start('#firebaseui-auth-container', uiConfig); }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.authUI.delete();
  }
}
