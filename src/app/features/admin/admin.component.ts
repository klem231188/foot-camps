import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {User} from '../../models/user';
import {Role} from '../../models/role.enum';
import {FootballCamp} from '../../models/football-camp';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../../services/user/user.service';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {BehaviorSubject} from 'rxjs';
import {Session} from '../../models/session';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  footballCamps: FootballCamp[] = [];
  selectedFootballCamp: BehaviorSubject<FootballCamp> = new BehaviorSubject<FootballCamp>(null);
  selectedSession: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
  sessions: Session[] = [];
  user: User = null;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private footballCampService: FootballCampService,
    private sessionService: SessionService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
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

}
