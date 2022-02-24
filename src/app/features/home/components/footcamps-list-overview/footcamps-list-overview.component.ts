import {Component, OnInit} from '@angular/core';
import {FootballCamp} from '../../../../models/football-camp';
import {Session} from '../../../../models/session';
import {FootballCampService} from '../../../../services/football-camp/football-camp.service';
import {SessionService} from '../../../../services/session/session.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-footcamps-list-overview',
  templateUrl: './footcamps-list-overview.component.html',
  styleUrls: ['./footcamps-list-overview.component.scss']
})
export class FootcampsListOverviewComponent implements OnInit {

  footballCamps: FootballCamp[];
  sessions: Session[];

  constructor(public footballCampService: FootballCampService,
              public sessionService: SessionService) {
  }

  availableRegistrations(session: Session): number {
    return session.maximumNumberOfRegistrations - (session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted);
  }

  getFootballCampOverviewImage(footCamp: FootballCamp): string {
    return `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url('${footCamp.overview.pathToImage200px}')`;
  }

  ngOnInit(): void {
    console.log('FootballCampHomeComponent.ngOnInit');
    this.footballCampService
      .getFootballCamps()
      .pipe(
        tap(value => this.footballCamps = value)
      )
      .subscribe();

    this.sessionService
      .getSessions()
      .pipe(
        tap(value => this.sessions = value)
      )
      .subscribe();
  }

  percentageOfAvailability(session: Session): number {
    const availableRegistrations = this.availableRegistrations(session);
    return (availableRegistrations / session.maximumNumberOfRegistrations) * 100;
  }

  percentageOfRegistrations(session: Session): number {
    return ((session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted) / session.maximumNumberOfRegistrations) * 100;
  }

  getPrice(footCamp: FootballCamp): string {
    const halfBoardPrices: number[] = this.sessions.filter(s => s.campId === footCamp.id).map(s => s.prices.halfBoardPrice);
    const minPrice = Math.min(...halfBoardPrices);
    const maxPrice = Math.max(...halfBoardPrices);

    if (minPrice < maxPrice) {
      return '' + minPrice + '<small> à </small>' + maxPrice + ' €';
    } else {
      return '' + maxPrice + ' €';
    }
  }
}
