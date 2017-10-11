import {Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {FootballCamp, Session} from '../../services/football-camp/football-camp';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params} from '@angular/router';
import {GalleryComponent} from 'angular2-image-gallery';
import * as _ from 'lodash';

@Component({
  selector: 'football-camp-details',
  templateUrl: 'football-camp-details.component.html',
  styleUrls: ['football-camp-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FootballCampDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild(GalleryComponent) gallery: GalleryComponent;

  footballCamp: FootballCamp = null;

  viewerOpened = false;

  constructor(private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.route
      .params
      .switchMap((params: Params) => {
        return this.footballCampService.getFootballCamp(+params['id']);
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp;
      });
  }

  ngAfterViewInit() {
  }

  getHalfBoardRatesSessions(): Session[] {
    return _.reject(this.footballCamp.details.sessions, ['halfBoardRates', null]);
  }

  hasHalfBoardRatesSessions(): boolean {
    return !_.isEmpty(this.getHalfBoardRatesSessions());
  }

  isViewerOpened(): boolean {
    return this.viewerOpened;
  }

  onViewerChange(viewerOpened: boolean) {
    console.log('Viewer isOpened = ' + viewerOpened);
    this.viewerOpened = viewerOpened;
  }
}
