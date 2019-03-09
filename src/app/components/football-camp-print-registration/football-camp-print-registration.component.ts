import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {RegistrationService} from '../../services/registration/registration.service';
import {FootballCamp} from '../../models/football-camp';
import {Session} from '../../models/session';
import {RegistrationV2} from '../../models/registration-v2.model';
import {DocumentType} from '../../models/document-type.enum';

@Component({
  selector: 'app-football-camp-print-registration',
  templateUrl: './football-camp-print-registration.component.html',
  styleUrls: ['./football-camp-print-registration.component.scss']
})
export class FootballCampPrintRegistrationComponent implements OnInit {

  camp: FootballCamp;
  session: Session;
  registration: RegistrationV2;

  constructor(private route: ActivatedRoute,
              public footballCampService: FootballCampService,
              public sessionService: SessionService,
              public registrationService: RegistrationService,
  ) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if (!params.campId || !params.sessionId || !params.registrationId) {
          console.log('Missing query params !');
        } else {
          this.footballCampService.getFootballCamp(params.campId)
            .subscribe((camp) => {
              this.camp = camp;
            });

          this.sessionService.getSession(params.sessionId)
            .subscribe((session) => {
              this.session = session;
            });

          this.registrationService.getRegistration(params.registrationId)
            .subscribe((registration) => {
              this.registration = registration;
            });
        }
      });
  }

  getPhotoUrl(registration: RegistrationV2): string {
    return registration.documents.find((doc) => doc.type === DocumentType.PHOTO_IDENTITE).url;
  }

}
