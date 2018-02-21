import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {FirebaseAuthUiService} from 'app/services/firebase-auth-ui/firebase-auth-ui.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Role} from '../../models/role.enum';

@Component({
  selector: 'app-football-camp-login',
  templateUrl: './football-camp-login.component.html',
  styleUrls: ['./football-camp-login.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class FootballCampLoginComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private angularFireAuth: AngularFireAuth,
              private firebaseAuthUiService: FirebaseAuthUiService,
              private userService: UserService,
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
            signInSuccess: function (currentUser, credential, redirectUrl) {
              console.log('CallBack : currentUser = ' + JSON.stringify(currentUser));

              this.userService
                .getUser(currentUser.uid)
                .subscribe(
                  (user: User) => {
                    console.log('getUser() returns : ' + JSON.stringify(user));
                    if (user) {
                      console.log('User already in database');
                    } else {
                      console.log('User not yet in database');

                      // Make user object to store
                      const userToStore: User = {
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        phoneNumber: currentUser.phoneNumber,
                        photoURL: currentUser.photoURL,
                        providerId: currentUser.providerId,
                        role: Role.USER,
                        uid: currentUser.uid
                      };

                      // Store user in database
                      this.userService.addUser(userToStore);
                    }
                  }
                );

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
