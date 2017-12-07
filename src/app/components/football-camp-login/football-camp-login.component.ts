import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-football-camp-login',
  templateUrl: './football-camp-login.component.html',
  styleUrls: ['./football-camp-login.component.scss']
})
export class FootballCampLoginComponent implements OnInit, AfterViewInit, OnDestroy {

  private authUI: firebaseui.auth.AuthUI = null;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.angularFireAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser && firebaseUser.uid) {
        // Logged
        console.log('Logged');
        console.log(firebaseUser);
        this.router.navigateByUrl('/locate');
      } else {
        // Not yet logged
        console.log('Not yet logged');
        if (!this.authUI) {
          // FirebaseUI config.
          const uiConfig = {
            signInSuccessUrl: this.router.navigateByUrl('/locate'),
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'popup',
            // Terms of service url.
            tosUrl: '/tos.html'
          };
          // Initialize the FirebaseUI Widget using Firebase.
          this.authUI = new firebaseui.auth.AuthUI(this.angularFireAuth.auth);
          // The start method will wait until the DOM is loaded.
          setTimeout(() => { this.authUI.start('#firebaseui-auth-container', uiConfig); }, 1000);
        }
      }
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    if (this.authUI) {
      this.authUI.delete();
      this.authUI = null;
    }
  }
}
