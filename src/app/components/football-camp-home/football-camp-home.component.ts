import {Component, OnInit} from '@angular/core';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {tap} from 'rxjs/operators';
import {FootballCamp} from '../../models/football-camp';
import {Session} from '../../models/session';

@Component({
  selector: 'app-football-camp-home',
  templateUrl: './football-camp-home.component.html',
  styleUrls: ['./football-camp-home.component.scss']
})
export class FootballCampHomeComponent implements OnInit {

  footballCamps: FootballCamp[];

  constructor(private footballCampService: FootballCampService,
              private sessionService: SessionService) {
  }

  getFootballCampOverviewImage(footCamp: FootballCamp): string {
    return `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url('${footCamp.overview.pathToImage})`;
  }

  ngOnInit(): void {
    this.footballCampService
      .getFootballCamps()
      .pipe(
        tap(value => this.footballCamps = value),
      )
      .subscribe();
  }

  percentageOfRegistrations(session: Session): number {
    return ((session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted) / session.maximumNumberOfRegistrations) * 100;
  }

  availableRegistrations(session: Session): number {
    return session.maximumNumberOfRegistrations - (session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted);
  }

  percentageOfAvailability(session: Session): number {
    const availableRegistrations = this.availableRegistrations(session);
    return (availableRegistrations / session.maximumNumberOfRegistrations) * 100;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
