import {Component, OnInit} from "@angular/core";
import {FootballCampService} from "../../services/football-camp/football-camp.service";
import {FootballCamp} from "../../services/football-camp/football-camp";
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'football-camp-locator',
  templateUrl: 'football-camp-locator.component.html'
})
export class FootballCampLocatorComponent implements OnInit {
  private footballCamp: FootballCamp = null;

  constructor(private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

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
}
