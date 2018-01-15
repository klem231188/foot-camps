import {AfterViewInit, Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params} from '@angular/router';
import * as _ from 'lodash';
import {FootballCamp} from '../../models/football-camp';
import {Session} from '../../models/session';

@Component({
  selector: 'football-camp-details',
  templateUrl: 'football-camp-details.component.html',
  styleUrls: ['football-camp-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FootballCampDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  numberOfRegistrations = 10;

  footballCamp: FootballCamp = null;

  viewerOpened = false;

  constructor(private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    console.log('FootballCampDetailsComponent.ngOnInit()');
    this.route
      .params
      .switchMap((params: Params) => {
        return this.footballCampService.getFootballCamp(params['id']);
      })
      .subscribe((footballCamp: FootballCamp) => {
        console.log(footballCamp);
        this.footballCamp = footballCamp;
      });
  }

  ngAfterViewInit() {
    console.log('FootballCampDetailsComponent.ngAfterViewInit()');
  }

  ngOnDestroy(): void {
    console.log('FootballCampDetailsComponent.ngOnDestroy()');
  }

  getHalfBoardRatesSessions(): Session[] {
    return _.reject(this.footballCamp.details.sessions, ['halfBoardRates', null]);
  }

  hasHalfBoardRatesSessions(): boolean {
    return !_.isEmpty(this.getHalfBoardRatesSessions());
  }

  getFullBoardRatesSessions(): Session[] {
    return _.reject(this.footballCamp.details.sessions, ['fullBoardRates', null]);
  }

  hasFullBoardRatesSessions(): boolean {
    return !_.isEmpty(this.getFullBoardRatesSessions());
  }

  percentageOfRegistrations(session: Session): number {
    return (this.numberOfRegistrations / session.maximumNumberOfRegistrations) * 100;
  }

  isViewerOpened(): boolean {
    return this.viewerOpened;
  }

  onViewerChange(viewerOpened: boolean) {
    console.log('Viewer isOpened = ' + viewerOpened);
    this.viewerOpened = viewerOpened;
  }
}
