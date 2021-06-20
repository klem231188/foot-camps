import {Component, OnInit} from '@angular/core';
import {FootballCamp} from '../../models/football-camp';
import {Subject} from 'rxjs';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import * as _ from 'lodash';
import {MatDialog} from '@angular/material/dialog';

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
  viewerOpened = false;

  constructor(
              private dialog: MatDialog,
              private footballCampService: FootballCampService,
              private route: ActivatedRoute,
              private sessionService: SessionService
  ) {
  }

  getFullBoardRatesSessions(): Session[] {
    return _.reject(this.sessions, ['fullBoardRates', null]);
  }

  getHalfBoardRatesSessions(): Session[] {
    return _.reject(this.sessions, ['halfBoardRates', null]);
  }

  hasFullBoardRatesSessions(): boolean {
    return !_.isEmpty(this.getFullBoardRatesSessions());
  }

  hasHalfBoardRatesSessions(): boolean {
    return !_.isEmpty(this.getHalfBoardRatesSessions());
  }

  isViewerOpened(): boolean {
    return this.viewerOpened;
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

  onViewerChange(viewerOpened: boolean) {
    this.viewerOpened = viewerOpened;
  }

  percentageOfRegistrations(session: Session): number {
    return ((session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted) / session.maximumNumberOfRegistrations) * 100;
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
