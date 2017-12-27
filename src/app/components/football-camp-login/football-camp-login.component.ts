import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {FirebaseAuthUiService} from 'app/services/firebase-auth-ui/firebase-auth-ui.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-football-camp-login',
  templateUrl: './football-camp-login.component.html',
  styleUrls: ['./football-camp-login.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class FootballCampLoginComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private firebaseAuthUiService: FirebaseAuthUiService,
    private router: Router,
    private location: Location
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
        // FirebaseUI config.
        const uiConfig = {
          'callbacks': {
            signInSuccess: function (currentUser, credential, redirectUrl) {
              // this.router.navigateByUrl('locate');
              this.location.back();
              // Do not redirect.
              return false;
            }.bind(this),
          },
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          signInFlow: 'popup',
          // Terms of service url.
          tosUrl: '/tos.html'
        };
        // Initialize the FirebaseUI Widget using Firebase.
        const authUI = this.firebaseAuthUiService.getAuthUi();
        // The start method will wait until the DOM is loaded.
        setTimeout(() => {
          authUI.reset();
          authUI.start('#firebaseui-auth-container', uiConfig);
        }, 1000);
      }
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }
}
