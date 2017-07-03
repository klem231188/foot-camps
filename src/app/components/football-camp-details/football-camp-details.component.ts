import {Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation} from "@angular/core";
import {FootballCamp, Session} from "../../services/football-camp/football-camp";
import {FootballCampService} from "../../services/football-camp/football-camp.service";
import {ActivatedRoute, Params} from "@angular/router";
import {GalleryComponent} from "angular2-image-gallery";
import * as _ from "lodash";

@Component({
  selector: 'football-camp-details',
  templateUrl: 'football-camp-details.component.html',
  styleUrls: ['football-camp-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FootballCampDetailsComponent implements OnInit, AfterViewInit {

  footballCamp: FootballCamp = null;

  constructor(private route: ActivatedRoute,
              private footballCampService: FootballCampService,) {
  }

  @ViewChild(GalleryComponent) gallery: GalleryComponent;

  ngOnInit(): void {
    this.route
      .params
      .switchMap((params: Params) => {
        return this.footballCampService.getFootballCamp(+params['id'])
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp
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

  onViewerChange(event) {
    console.log(event);
  }
}
