import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {Role} from '../../models/role.enum';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../models/football-camp';
import {AngularFireAuth} from '@angular/fire/auth';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../../services/user/user.service';
import {BehaviorSubject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {SessionService} from '../../services/session/session.service';
import {Session} from '../../models/session';
import {RegistrationV2} from '../../models/registration-v2.model';

@Component({
  selector: 'app-football-camp-admin-dashboard',
  templateUrl: './football-camp-admin-dashboard.component.html',
  styleUrls: ['./football-camp-admin-dashboard.component.scss']
})
export class FootballCampAdminDashboardComponent implements OnInit, AfterViewChecked {

  currentRegistration: RegistrationV2;
  footballCamps: FootballCamp[];
  selectedFootballCamp: BehaviorSubject<FootballCamp>;
  selectedSession: BehaviorSubject<Session>;
  sessions: Session[];
  @ViewChild('uiControlFootballCamp') uiControlFootballCamp: MatSelect;
  uiControlFootballCampInitialized: boolean;
  @ViewChild('uiControlSession') uiControlSession: MatSelect;
  uiControlSessionInitialized: boolean;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    private userService: UserService,
    private footballCampService: FootballCampService,
    private sessionService: SessionService
  ) {
    this.selectedFootballCamp = new BehaviorSubject<FootballCamp>(null);
    this.uiControlFootballCampInitialized = false;

    this.selectedSession = new BehaviorSubject<Session>(null);
    this.uiControlSessionInitialized = false;

    this.currentRegistration = null;
  }

  ngAfterViewChecked(): void {
    if (this.uiControlFootballCamp && !this.uiControlFootballCampInitialized) {
      this.uiControlFootballCampInitialized = true;
      this.uiControlFootballCamp.registerOnChange((footballCamp: FootballCamp) => {
        this.selectedFootballCamp.next(footballCamp);
      });

      this.selectedFootballCamp
        .subscribe((footballCamp: FootballCamp) => {
          this.uiControlFootballCamp.value = footballCamp;
        })
    }

    if (this.uiControlSession && !this.uiControlSessionInitialized) {
      this.uiControlSessionInitialized = true;
      this.uiControlSession.registerOnChange((session: Session) => {
        this.selectedSession.next(session);
        this.currentRegistration = null;
      });

      this.selectedSession
        .subscribe((session: Session) => {
          this.uiControlSession.value = session;
        })
    }
  }

  ngOnInit() {
    console.log('FootballCampAdminDashboardComponent.ngOnInit()');

    // Get connected user
    this.angularFireAuth.authState
      .pipe(
        switchMap((firebaseUser) => {
          // Get associated user stored in firestore
          return this.userService.getUser(firebaseUser.uid);
        })
      ).subscribe((user: User) => {
      // According to role, get football camps
      this.user = user;
      switch (user.role) {
        case Role.ORGANIZER :
          this.footballCampService
            .getFootballCamp(user.campId)
            .subscribe((footballCamp: FootballCamp) => {
              this.footballCamps = [footballCamp];
              this.selectedFootballCamp.next(this.footballCamps[0]);
            });
          break;
        case Role.ADMIN:
          this.footballCampService
            .getFootballCamps()
            .subscribe((footballCamps: FootballCamp[]) => {
              this.footballCamps = footballCamps;
              this.selectedFootballCamp.next(this.footballCamps[0]);
            });
          break;
        case Role.USER :
          this.footballCamps = [];
          break;
      }
    });

    this.selectedFootballCamp
      .subscribe((footballCamp: FootballCamp) => {
        if (footballCamp) {
          this.selectedSession.next(null);

          this.sessionService
            .getSessionsFromCampId(footballCamp.id)
            .subscribe((sessions: Session[]) => {
              this.sessions = sessions;
              if (this.sessions.length > 0) {
                this.selectedSession.next(this.sessions[0]);
              }
            });
        }
      });
  }

  onRegistrationSelected(registration: RegistrationV2) {
    this.currentRegistration = registration;
  }
}
