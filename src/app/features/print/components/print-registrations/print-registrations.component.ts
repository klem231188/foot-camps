import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FootballCampService} from '../../../../services/football-camp/football-camp.service';
import {SessionService} from '../../../../services/session/session.service';
import {RegistrationService} from '../../../../services/registration/registration.service';
import {FootballCamp} from '../../../../models/football-camp';
import {Session} from '../../../../models/session';
import {RegistrationV2} from '../../../../models/registration-v2.model';
import {DocumentType} from '../../../../models/document-type.enum';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-print-registrations',
  templateUrl: './print-registrations.component.html',
  styleUrls: ['./print-registrations.component.scss']
})
export class PrintRegistrationsComponent implements OnInit {

  camp: FootballCamp;
  registrations: RegistrationV2[];
  session: Session;
  isFirefox = false;

  constructor(
    private route: ActivatedRoute,
    public footballCampService: FootballCampService,
    public sessionService: SessionService,
    public registrationService: RegistrationService
  ) {
  }

  getPhotoUrl(registration: RegistrationV2): string {
    return registration.documents.find((doc) => doc.type === DocumentType.PHOTO_IDENTITE).url;
  }

  ngOnInit() {
    this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    this.route
      .queryParams
      .subscribe(params => {
        if (!params.sessionId) {
          console.log('Missing query params !');
        } else {
          this.sessionService
            .getSession(params.sessionId)
            .pipe(
              tap((session) => this.session = session),
              switchMap(() => this.registrationService.getRegistrations(params.sessionId)),
              tap((registrations) => this.registrations = registrations),
              switchMap(() => this.footballCampService.getFootballCamp(this.session.campId)),
              tap((camp) => this.camp = camp)
            ).subscribe();
        }
      });
  }

  onPrint() {
    window.print();
  }
}
