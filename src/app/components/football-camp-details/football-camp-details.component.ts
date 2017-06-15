import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {FootballCamp} from "../../services/football-camp/football-camp";
import {FootballCampService} from "../../services/football-camp/football-camp.service";
import {ActivatedRoute, Params} from "@angular/router";
import {GalleryComponent} from "angular2-image-gallery";

@Component({
  selector: 'football-camp-details',
  templateUrl: 'football-camp-details.component.html',
  styleUrls: ['football-camp-details.component.scss']
})
export class FootballCampDetailsComponent implements OnInit, AfterViewInit {

  private footballCamp: FootballCamp = null;

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

  onViewerChange(event) {
    console.log(event);
  }
}
