import {Component, OnInit} from "@angular/core";
import {FootballCamp} from "../football-camp/football-camp";
import {FootballCampService} from "../football-camp/football-camp.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'football-camp-details',
  templateUrl: 'football-camp-details.component.html',
  styleUrls: ['football-camp-details.component.scss']
})
export class FootballCampDetailsComponent implements OnInit {

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
