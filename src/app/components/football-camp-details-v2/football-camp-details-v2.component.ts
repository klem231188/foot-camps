import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {switchMap, tap} from 'rxjs/operators';
import {FootballCamp} from '../../models/football-camp';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {Subject} from 'rxjs';
import * as _ from 'lodash';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-football-camp-details-v2',
  templateUrl: './football-camp-details-v2.component.html',
  styleUrls: ['./football-camp-details-v2.component.scss']
})
export class FootballCampDetailsV2Component implements OnChanges, OnInit {

  @Input() campId;
  footballCamp: FootballCamp = null;
  reloadSubject: Subject<void> = new Subject<void>();
  selectedSession: Session = null;
  sessions: Session[] = [];
  viewerOpened = false;

  constructor(private breakpointObserver: BreakpointObserver,
              private footballCampService: FootballCampService,
              private sessionService: SessionService) {
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

  isSmallScreen(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 800px)');
  }

  isViewerOpened(): boolean {
    return this.viewerOpened;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FootballCampDetailsV2Component.ngOnChanges()');
    const campIdChange = changes['campId'];
    if (campIdChange && !campIdChange.isFirstChange() && campIdChange.previousValue !== campIdChange.currentValue) {
      this.campId = campIdChange.currentValue;
      this.reloadSubject.next();
    }
  }

  ngOnInit(): void {
    console.log('FootballCampDetailsV2Component.ngOnInit()');
    this.reloadSubject.subscribe(() => this.reload());
    this.reloadSubject.next();
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
