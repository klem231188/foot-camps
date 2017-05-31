import {Component, OnInit, Output} from "@angular/core";
import {FootballCampService} from "../football-camp/football-camp.service";
import {FootballCamp} from "../football-camp/football-camp";

@Component({
  selector: 'football-camp-map',
  templateUrl: 'football-camp-map.component.html',
  styleUrls: ['football-camp-map.component.scss'],
  providers: [FootballCampService]
})
export class FootballCampMapComponent implements OnInit {

  footballCampSelected: FootballCamp;

  footballCamps: FootballCamp[];

  constructor(private footballCampService: FootballCampService) {
    this.footballCampSelected = null;
  }

  ngOnInit(): void {
    this.footballCampService
      .getFootballCamps()
      .then(footballCamps => this.footballCamps = footballCamps);
  }

  onFootballCampMarkerClicked(id: number) {
    this.footballCampSelected = this.footballCamps[id];
    console.log(this.footballCampSelected);
  }
}
