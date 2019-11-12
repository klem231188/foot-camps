import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FootballCamp} from '../../models/football-camp';
import {Subject} from 'rxjs';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {switchMap, tap} from 'rxjs/operators';
import {SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-football-camp-badges',
  templateUrl: './football-camp-badges.component.html',
  styleUrls: ['./football-camp-badges.component.scss']
})
export class FootballCampBadgesComponent implements OnChanges, OnInit {

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

  getAgeSubtitle(): SafeHtml {
    return this.footballCamp.minimumAge + '<small> à </small>' + this.footballCamp.maximumAge + ' ans';
  }

  getPriceSubtitle(): SafeHtml {
    return '' + this.footballCamp.averagePrice + ' €';
  }

  getRegistrationSubtitle(): SafeHtml {
    return '' + this.countCurrentRegistrations() + '<small> / </small>' + this.countTotalAvailableRegistrations();
  }

  getSessionSubtitle(): SafeHtml {
    return '' + this.sessions.length;
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

  reload(): void {
    this.footballCampService
      .getFootballCamp(this.campId)
      .pipe(
        tap(footballCamp => this.footballCamp = footballCamp),
        switchMap(() => this.sessionService.getSessionsFromCampId(this.campId)),
        tap(sessions => this.sessions = sessions)
      )
      .subscribe();
  }


}
