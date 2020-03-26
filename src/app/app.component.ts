import {switchMap} from 'rxjs/operators';
import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FootballCampService} from './services/football-camp/football-camp.service';
import {FirebaseAuthUiService} from './services/firebase-auth-ui/firebase-auth-ui.service';
import {MatSidenav} from '@angular/material';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {RegistrationService} from './services/registration/registration.service';
import {SessionService} from './services/session/session.service';
import {User} from './models/user';
import {UserService} from './services/user/user.service';
import {UploadService} from './services/upload/upload.service';
import * as firebase from 'firebase';
import {PaymentService} from './services/payment/payment.service';
import {EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [
    FootballCampService,
    PaymentService,
    RegistrationService,
    UploadService,
    SessionService,
    UserService,
    AngularFireAuth,
    FirebaseAuthUiService
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  user: User = null;

  @ViewChild(MatSidenav, { static: true })
  private sidenav: MatSidenav;

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private userService: UserService) {

    this.angularFireAuth.authState.pipe(
      switchMap<firebase.User, Observable<User>>((firebaseUser) => {
        if (firebaseUser) {
          return userService.getUser(firebaseUser.uid);
        } else {
          return EMPTY;
        }
      }))
      .subscribe((user) => {
        console.log('user = ' + JSON.stringify(user));
        console.log(user);
        this.user = user;
      })
  }

  onFindFootballCampsClicked(): void {
    this.sidenav.toggle();
    this.router.navigate(['/locate']);
  }

  onHomeClicked() {
    this.sidenav.toggle();
    this.router.navigate(['/home']);
  }

  onViewRegistrationsClicked(): void {
    this.sidenav.toggle();
    this.router.navigate(['/admin-dashboard']);
  }
}
