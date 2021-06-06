import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {FootballCampService} from '../../../../services/football-camp/football-camp.service';
import {SessionService} from '../../../../services/session/session.service';
import {switchMap, tap} from 'rxjs/operators';
import {SafeHtml} from '@angular/platform-browser';
import {FootballCamp} from '../../../../models/football-camp';
import {Session} from '../../../../models/session';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnChanges, OnInit {

  @Input() campId;
  footballCamp: FootballCamp = null;
  reloadSubject: Subject<void> = new Subject<void>();
  sessions: Session[] = [];

  constructor(private footballCampService: FootballCampService,
              private sessionService: SessionService) {
  }

  countCurrentRegistrations(): number {
    let countCurrentRegistrations = 0;
    for (const session of this.sessions) {
      countCurrentRegistrations += session.numberOfRegistrationsAccepted + session.numberOfRegistrationsInProgress;
    }
    return countCurrentRegistrations;
  }

  countTotalAvailableRegistrations(): number {
    let countTotalAvailableRegistrations = 0;
    for (const session of this.sessions) {
      countTotalAvailableRegistrations += session.maximumNumberOfRegistrations;
    }
    return countTotalAvailableRegistrations;
  }

  getAgeSubtitle(): string {
    return this.footballCamp.minimumAge + '<small> à </small>' + this.footballCamp.maximumAge + ' ans';
  }

  getPriceSubtitle(): string {
    return '' + this.footballCamp.paymentInfo.prices.halfBoardPrice + ' €';
  }

  getRegistrationSubtitle(): string {
    return '' + this.countCurrentRegistrations() + '<small> / </small>' + this.countTotalAvailableRegistrations();
  }

  getSessionSubtitle(): string {
    return '' + this.sessions.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('BadgesComponent.ngOnChanges()');
    const campIdChange = changes['campId'];
    if (campIdChange && !campIdChange.isFirstChange() && campIdChange.previousValue !== campIdChange.currentValue) {
      this.campId = campIdChange.currentValue;
      this.reloadSubject.next();
    }
  }

  ngOnInit(): void {
    console.log('BadgesComponent.ngOnInit()');
    this.reloadSubject
      .pipe(
        switchMap(() => this.reload())
      )
      .subscribe();
    this.reloadSubject.next();
  }

  reload() {
    return this.footballCampService
      .getFootballCamp(this.campId)
      .pipe(
        tap(footballCamp => this.footballCamp = footballCamp),
        switchMap(() => this.sessionService.getSessionsFromCampId(this.campId)),
        tap(sessions => this.sessions = sessions)
      );
  }
}
