import {Component, OnInit} from "@angular/core";
import {FootballCampService} from "../football-camp/football-camp.service";
import {FootballCamp} from "../football-camp/football-camp";

@Component({
  selector: 'football-camp-map',
  templateUrl: 'football-camp-map.component.html',
  styleUrls: ['football-camp-map.component.scss']
})
export class FootballCampMapComponent implements OnInit {

  footballCamps: FootballCamp[];

  constructor(private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.footballCampService
      .getFootballCamps()
      .then(footballCamps => this.footballCamps = footballCamps);
  }

  onMarkerClicked(footballCampId: number) {
    let footballCampSelected : FootballCamp = this.footballCamps[footballCampId];
    this.footballCampService.selectFootballCamp(footballCampSelected);
  }
}
