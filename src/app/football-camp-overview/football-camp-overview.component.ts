import {Component, Input, OnInit} from "@angular/core";
import {FootballCamp} from "../football-camp/football-camp";
import {FOOTBAL_CAMPS} from "../football-camp/football-camps-mock";

@Component({
  selector: 'football-camp-overview',
  templateUrl: 'football-camp-overview.component.html',
  styleUrls: ['football-camp-overview.component.scss']
})
export class FootballCampOverviewComponent implements OnInit {

  @Input() public footballCamp : FootballCamp;

  ngOnInit(): void {
    this.footballCamp = FOOTBAL_CAMPS[0];
  }

}
