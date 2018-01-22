import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FootballCampService} from './services/football-camp/football-camp.service';
import {FirebaseAuthUiService} from './services/firebase-auth-ui/firebase-auth-ui.service';
import {MatSidenav} from '@angular/material';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {RegistrationService} from './services/registration/registration.service';
import {SessionService} from './services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [FootballCampService, RegistrationService, SessionService, AngularFireAuth, FirebaseAuthUiService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  @ViewChild(MatSidenav)
  private sidenav: MatSidenav;

  constructor(private router: Router) {
  }

  onFindFootballCampsClicked(): void {
    this.sidenav.toggle();
    this.router.navigate(['/locate']);
  }
}
