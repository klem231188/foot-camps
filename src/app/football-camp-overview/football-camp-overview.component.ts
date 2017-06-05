import {Component, OnInit} from "@angular/core";
import {FootballCamp} from "../football-camp/football-camp";
import {FootballCampService} from "../football-camp/football-camp.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'football-camp-overview',
  templateUrl: 'football-camp-overview.component.html',
  styleUrls: ['football-camp-overview.component.scss']
})
export class FootballCampOverviewComponent implements OnInit {

  private footballCamp: FootballCamp = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
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

  onDetailsClicked(): void {
    this.router.navigate(['/locate', this.footballCamp.id, 'details']);
  }
}
