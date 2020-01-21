import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {RegistrationService} from '../../services/registration/registration.service';
import {FootballCamp} from '../../models/football-camp';
import {Session} from '../../models/session';
import {RegistrationV2} from '../../models/registration-v2.model';
import {DocumentType} from '../../models/document-type.enum';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-football-camp-print-registrations',
  templateUrl: './football-camp-print-registrations.component.html',
  styleUrls: ['./football-camp-print-registrations.component.scss']
})
export class FootballCampPrintRegistrationsComponent implements OnInit {

  camp: FootballCamp;
  registrations: RegistrationV2[];
  session: Session;

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
    this.route
      .queryParams
      .subscribe(params => {
        if (!params.sessionId) {
          console.log('Missing query params !');
        } else {
          this.footballCampService.getFootballCamp(params.campId)
            .subscribe((camp) => {
              this.camp = camp;
            });

          this.sessionService
            .getSession(params.sessionId)
            .pipe(
              tap((session) => this.session = session)
            )
            .switchMap(() => this.registrationService.getRegistrations(params.sessionId))
            .pipe(
              tap((registrations) => this.registrations = registrations)
            )
            .switchMap(() => this.footballCampService.getFootballCamp(this.session.campId))
            .pipe(
              tap((camp) => this.camp = camp)
            )
            .subscribe();
        }
      });
  }

}
