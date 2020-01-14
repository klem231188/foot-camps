import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RegistrationService} from '../../services/registration/registration.service';
import {Dictionary, groupBy} from 'lodash';
import {RegistrationV2} from '../../models/registration-v2.model';
import {SessionService} from '../../services/session/session.service';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {Session} from '../../models/session';
import {FootballCamp} from '../../models/football-camp';
import {tap} from 'rxjs/operators';
import {switchMap} from 'rxjs-compat/operator/switchMap';

@Component({
  selector: 'app-football-camp-print-receipt',
  templateUrl: './football-camp-print-receipt.component.html',
  styleUrls: ['./football-camp-print-receipt.component.scss']
})
export class FootballCampPrintReceiptComponent implements OnInit {

  camp: FootballCamp;
  registration: RegistrationV2;
  session: Session;

  constructor(
    public route: ActivatedRoute,
    public registrationService: RegistrationService,
    public sessionService: SessionService,
    public footballCampService: FootballCampService
  ) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
          if (!params.registrationId) {
            console.log('Missing query params !');
          } else {
            this.registrationService
              .getRegistration(params.registrationId)
              .pipe(
                tap((registration) => this.registration = registration),
              )
              .switchMap(() => {
                return this.sessionService.getSession(this.registration.sessionId);
              })
              .pipe(
                tap((session) => this.session = session),
              )
              .switchMap(() => {
                return this.footballCampService.getFootballCamp(this.session.campId);
              })
              .pipe(
                tap((camp) => this.camp = camp),
              )
              .subscribe();
          }
        }
      );
  }

}
