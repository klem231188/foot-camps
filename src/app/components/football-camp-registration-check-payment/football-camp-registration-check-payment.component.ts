import {Component, Input, OnInit} from '@angular/core';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {Observable} from 'rxjs/index';
import {FootballCamp} from '../../models/football-camp';
import {SessionService} from '../../services/session/session.service';
import {Session} from '../../models/session';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-football-camp-registration-check-payment',
  templateUrl: './football-camp-registration-check-payment.component.html',
  styleUrls: ['./football-camp-registration-check-payment.component.scss']
})
export class FootballCampRegistrationCheckPaymentComponent implements OnInit {

  @Input() campId: string;
  @Input() sessionId: string;

  footballCamp$: Observable<FootballCamp>;
  session$: Observable<Session>;

  constructor(
    private footballCampService: FootballCampService,
    private sessionService: SessionService
  ) {
  }

  ngOnInit() {
    console.log('FootballCampRegistrationCheckPaymentComponent.ngOnInit()');

    this.footballCamp$ = this.footballCampService.getFootballCamp(this.campId);
    this.session$ = this.sessionService
      .getSessionsFromCampId(this.campId)
      .pipe(
        map((sessions: Session[]) => {
          return sessions.find(session => session && session.id === this.sessionId)
        })
      );
  }

}
