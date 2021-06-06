import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FootballCamp} from '../../models/football-camp';
import {Observable, Subject} from 'rxjs';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  campId = '';
  footballCamp: FootballCamp = null;
  reloadSubject: Subject<void> = new Subject<void>();
  selectedSession: Session = null;
  sessions: Session[] = [];
  showRegistrationBar = false;

  constructor(private footballCampService: FootballCampService,
              private route: ActivatedRoute,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    console.log('FootballCampDetailsV2Component.ngOnInit()');
    this.reloadSubject.subscribe(() => this.reload());
    this.route.params.pipe(
      tap((params: Params) => this.campId = params['id']),
      tap(() => this.reloadSubject.next())
    ).subscribe();
  }

  onInViewportChange(inViewport: boolean) {
    console.log('onInViewportChange' + inViewport);
    this.showRegistrationBar = !inViewport;
  }

  reload() {
    this.footballCampService
      .getFootballCamp(this.campId)
      .pipe(
        tap(footballCamp => this.footballCamp = footballCamp),
        switchMap(() => this.sessionService.getSessionsFromCampId(this.campId)),
        tap(sessions => {
          this.sessions = sessions;
          if (this.sessions && this.sessions.length > 0) {
            this.selectedSession = this.sessions[0];
          }
        })
      )
      .subscribe();
  }
}
