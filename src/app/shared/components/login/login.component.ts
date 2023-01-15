import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {FirebaseAuthUiService} from 'app/services/firebase-auth-ui/firebase-auth-ui.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../models/user';
import {Role} from '../../../models/role.enum';
import {Meta, Title} from '@angular/platform-browser';
import * as firebaseui from 'firebaseui';
import {MatSnackBar} from '@angular/material/snack-bar';
import {take, takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private angularFireAuth: AngularFireAuth,
              private firebaseAuthUiService: FirebaseAuthUiService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router,
              private location: Location,
              private titleService: Title,
              private meta: Meta) {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    console.log('LoginComponent.destroy()');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Footcamps - Connectez-vous');
    this.meta.updateTag({name: 'description', content: 'Se connecter à footcamps'});
    this.meta.updateTag({name: 'keywords', content: 'footcamps, stage, football, connexion, se connecter'});

    this.angularFireAuth
      .authState
      .pipe(takeUntil(this.destroy$))
      .subscribe((firebaseUser) => {
      if (firebaseUser && firebaseUser.uid) {
        // Logged
        console.log('Logged');
        console.log(firebaseUser);
        this.router.navigateByUrl('/accueil');
      } else {
        // Not yet logged
        console.log('Not yet logged');
        // FirebaseUI config.
        const uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              const currentUser = authResult.user;
              this.userService
                .getUser(currentUser.uid)
                .pipe(
                  take(1),
                  tap(async (user: User) => {
                    console.log('getUser() returns : ' + JSON.stringify(user));
                    if (user.email) {
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
                      await this.userService.addUser(userToStore);
                    }
                  }),
                  tap(() => {
                    // go back
                    this.location.back();
                  })
                )
                .subscribe();

              // Do not redirect.
              return false;
            }.bind(this),
          },
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
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
}
