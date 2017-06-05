import {Component, Input, OnInit} from "@angular/core";
import {FootballCamp} from "../football-camp/football-camp";
import {FOOTBAL_CAMPS} from "../football-camp/football-camps-mock";
import {FootballCampService} from "../football-camp/football-camp.service";

@Component({
  selector: 'football-camp-details',
  templateUrl: 'football-camp-details.component.html',
  styleUrls: ['football-camp-details.component.scss']
})
export class FootballCampDetailsComponent implements OnInit {

  private footballCamp: FootballCamp = null;

  constructor(private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.footballCampService.footballCampSelectedSource.asObservable().subscribe(
      footballCamp => {
        this.footballCamp = footballCamp;
      });
  }

}
