import {Component, OnInit} from '@angular/core';
import {switchMap, tap} from 'rxjs/operators';
import {User} from '../../models/user';
import {Role} from '../../models/role.enum';
import {FootballCamp} from '../../models/football-camp';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../../services/user/user.service';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {BehaviorSubject, of} from 'rxjs';
import {Session} from '../../models/session';
import {SessionService} from '../../services/session/session.service';
import {RegistrationV2} from '../../models/registration-v2.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  footballCamps: FootballCamp[] = [];
  selectedCamp$: BehaviorSubject<FootballCamp> = new BehaviorSubject<FootballCamp>(null);
  selectedSession$: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
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
    this.selectedCamp$
      .pipe(
        switchMap((camp: FootballCamp) => {
          if (camp !== null) {
            return this.sessionService.getSessionsFromCampId(camp.id)
          } else {
            return of([]);
          }
        }),
        tap((sessions: Session[]) => {
          this.sessions = sessions != null ? sessions : [];
          this.selectedSession$.next(this.sessions.length > 0 ? this.sessions[0] : null);
        })
      )
      .subscribe();

    this.angularFireAuth.authState
      .pipe(
        switchMap((firebaseUser) => this.userService.getUser(firebaseUser.uid)),
        tap((user) => this.user = user),
        switchMap(() => {
          switch (this.user.role) {
            case Role.ADMIN:
              return this.footballCampService.getFootballCamps();
            case Role.ORGANIZER:
              return this.footballCampService.getFootballCamp(this.user.campId)
            case Role.USER:
              return of([]);
          }
        }),
        tap((camps: FootballCamp[]) => {
            this.footballCamps = camps != null ? camps : [];
            this.selectedCamp$.next(this.footballCamps.length > 0 ? this.footballCamps[0] : null);
          }
        )
      )
      .subscribe();
  }

  onCampSelected(camp: any) {
    this.selectedCamp$.next(camp);
  }

  onRegistrationSelected(registration: RegistrationV2) {
    console.log('onRegistrationSelected');
  }

  onSessionSelected(session: any) {
    this.selectedSession$.next(session);
  }
}
