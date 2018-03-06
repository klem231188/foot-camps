import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {RegistrationService} from '../../services/registration/registration.service';
import {SessionService} from '../../services/session/session.service';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Session} from '../../models/session';

@Component({
  selector: 'app-football-camp-registrations-viewer',
  templateUrl: './football-camp-registrations-viewer.component.html',
  styleUrls: ['./football-camp-registrations-viewer.component.scss']
})
export class FootballCampRegistrationsViewerComponent implements OnInit {

  user: User = null;

  sessions: Session[] = null;

  constructor(private angularFireAuth: AngularFireAuth,
              private footballCampService: FootballCampService,
              private userService: UserService,
              private sessionService: SessionService,
              private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.angularFireAuth.authState
      .switchMap<firebase.User, User>((firebaseUser) => {
        return this.userService.getUser(firebaseUser.uid);
      })
      .switchMap<User, Session[]>((user) => {
        this.user = user;
        // role == ADMIN
        return this.sessionService.getSessions();
      })
      .subscribe((sessions) => {
        this.sessions = sessions
      });
  }

}
