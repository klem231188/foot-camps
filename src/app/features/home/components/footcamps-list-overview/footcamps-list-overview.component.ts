import {Component, OnInit} from '@angular/core';
import {FootballCamp} from '../../../../models/football-camp';
import {Session} from '../../../../models/session';
import {FootballCampService} from '../../../../services/football-camp/football-camp.service';
import {SessionService} from '../../../../services/session/session.service';
import {tap} from 'rxjs/operators';
import {Gender} from '../../../../models/gender.enum';

@Component({
  selector: 'app-footcamps-list-overview',
  templateUrl: './footcamps-list-overview.component.html',
  styleUrls: ['./footcamps-list-overview.component.scss']
})
export class FootcampsListOverviewComponent implements OnInit {

  footballCamps: FootballCamp[];
  Gender = Gender;
  sessions: Session[];

  constructor(public footballCampService: FootballCampService,
              public sessionService: SessionService) {
  }

  availableRegistrations(session: Session): number {
    return session.maximumNumberOfRegistrations - (session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted);
  }

  getFootballCampOverviewImage(footCamp: FootballCamp): string {
    return `url('${footCamp.overview.pathToImage200px}')`;
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

  getPrice(footCamp: FootballCamp): string {
    const halfBoardPrices: number[] = this.sessions.filter(s => s.campId === footCamp.id).map(s => s.prices.halfBoardPrice);
    const minPrice = Math.min(...halfBoardPrices);
    const maxPrice = Math.max(...halfBoardPrices);

    if (minPrice < maxPrice) {
      return '' + minPrice + '<small> à </small>' + maxPrice + ' €';
    } else {
      if (maxPrice === 0) {
        return 'Gratuit';
      } else {
        return '' + maxPrice + ' €';
      }
    }
  }

  getGenders(footCamp: FootballCamp): Gender[] {
    return this.sessions
      .filter(s => s.campId === footCamp.id)
      .map(s => Array.isArray(s.genders) ? s.genders : [])
      .reduce((previous, current) => previous.concat(current));
  }

  getNumberOfSessions(footCamp: FootballCamp): string {
    const sessions = this.sessions.filter(s => s.campId === footCamp.id);
    return sessions.length > 1 ? `${sessions.length} Sessions` : `${sessions.length} Session`;
  }

  getSessionDates(footCamp: FootballCamp): string {
    const sessions: Session[] = this.sessions.filter(s => s.campId === footCamp.id);

    const dates: Date[] = sessions
      .map(s => [s.start.toDate(), s.end.toDate()])
      .reduce((acc, val) => acc.concat(val), [])
      .sort((a, b) => a.getTime() - b.getTime());

    let minMonth, maxMonth, year;

    if (dates != null) {
      if (dates.length > 0) {
        minMonth = dates[0].toLocaleString('fr', {month: 'long'});
        year = dates[0].toLocaleString('fr', {year: 'numeric'});
      }
      if (dates.length > 1) {
        maxMonth = dates[dates.length - 1].toLocaleString('fr', {month: 'long'});
      }
    }

    if (minMonth !== maxMonth) {
      return `${minMonth} | ${maxMonth} ${year}`;
    } else {
      return `${minMonth} ${year}`;
    }
  }

  getAvailableRegistrations(footCamp: FootballCamp): string {
    const sessions = this.sessions.filter(s => s.campId === footCamp.id);

    const nbActiveRegistrations = sessions
      .map(s => s.numberOfRegistrationsInProgress + s.numberOfRegistrationsAccepted)
      .reduce((previous, current) => previous + current);

    const nbMaxRegistrations = sessions
      .map(s => s.maximumNumberOfRegistrations)
      .reduce((previous, current) => previous + current);

    const nbAvailableRegistrations = nbMaxRegistrations - nbActiveRegistrations;

    return nbAvailableRegistrations === 0 ? 'Complet' : nbAvailableRegistrations === 1 ? '1 inscription disponible' : `${nbAvailableRegistrations} inscriptions disponibles`;
  }
}
