import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {FirebaseAuthUiService} from 'app/services/firebase-auth-ui/firebase-auth-ui.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AngularFirestore} from "angularfire2/firestore";
import {User, UserInfo} from "firebase";
import {userInfo} from "os";

@Component({
  selector: 'app-football-camp-login',
  templateUrl: './football-camp-login.component.html',
  styleUrls: ['./football-camp-login.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class FootballCampLoginComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private angularFireAuth: AngularFireAuth,
              private firebaseAuthUiService: FirebaseAuthUiService,
              private angularFirestore: AngularFirestore,
              private router: Router,
              private location: Location) {
  }

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
            signInSuccess: function (currentUser: User, credential, redirectUrl) {
              // Store user in database
              const currentUserInfo: UserInfo = {
                displayName: currentUser.displayName,
                email: currentUser.email,
                phoneNumber: currentUser.phoneNumber,
                photoURL: currentUser.photoURL,
                providerId: currentUser.providerId,
                uid: currentUser.uid
              };

              this.angularFirestore
                .collection('users')
                .doc(currentUser.uid)
                .set(currentUserInfo)
                .then(() => {
                  console.log(currentUserInfo.toString() + ' has been saved to database');
                })
                .catch(error => {
                  console.log('something goes wrong saving user in database ' + error)
                });
              // go back
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
