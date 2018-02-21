import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../../services/registration/registration.service';
import {SessionService} from '../../services/session/session.service';
import {FootballCampService} from '../../services/football-camp/football-camp.service';

@Component({
  selector: 'app-football-camp-registrations-viewer',
  templateUrl: './football-camp-registrations-viewer.component.html',
  styleUrls: ['./football-camp-registrations-viewer.component.scss']
})
export class FootballCampRegistrationsViewerComponent implements OnInit {

  constructor(private footballCampService: FootballCampService,
              private sessionService: SessionService,
              private registrationService: RegistrationService) {
  }

  ngOnInit() {
  }

}
