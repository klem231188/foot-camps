import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {RegistrationService} from '../../services/registration/registration.service';
import {SessionService} from '../../services/session/session.service';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Session} from '../../models/session';
import {Role} from '../../models/role.enum';
import {Registration} from '../../models/registration';

@Component({
  selector: 'app-football-camp-registrations-viewer',
  templateUrl: './football-camp-registrations-viewer.component.html',
  styleUrls: ['./football-camp-registrations-viewer.component.scss']
})
export class FootballCampRegistrationsViewerComponent implements OnInit {

  registrations: Registration[] = null;

  sessions: Session[] = null;

  selectedSession: Session = null;

  user: User = null;

  constructor(private angularFireAuth: AngularFireAuth,
              private footballCampService: FootballCampService,
              private userService: UserService,
              private sessionService: SessionService,
              private registrationService: RegistrationService) {
  }

  ngOnInit() {
    //TODO : améliorer en utilisant des Observable comme dans les services.
    this.angularFireAuth.authState
      .switchMap<firebase.User, User>((firebaseUser) => {
        return this.userService.getUser(firebaseUser.uid);
      })
      .switchMap<User, Session[]>((user) => {
        this.user = user;
        if (user.role === Role.ADMIN) {
          return this.sessionService.getSessions();
        } else {
          return this.sessionService.getSessionsFromCampId(user.campId);
        }
      })
      .switchMap<Session[], Registration[]>((sessions) => {
        this.sessions = sessions;
        this.selectedSession = (sessions != null && sessions.length > 0) ? sessions[0] : null;
        if (this.selectedSession != null) {
          return this.registrationService.getRegistrations(this.selectedSession.id);
        } else {
          return null;
        }
      })
      .subscribe((registrations) => {
        this.registrations = registrations;
      });
  }

  updateSelectedSession(session): void {
    this.selectedSession = session;

    this.registrationService
      .getRegistrations(this.selectedSession.id)
      .subscribe((registrations) => {
        this.registrations = registrations;
      });
  }
}
