import {Component, OnInit} from "@angular/core";
import {FootballCampMarkerService} from "./football-camp-marker.service";
import {FootballCampMarker} from "./football-camp-marker";
import {FootballCampService} from "../football-camp/football-camp.service";
import {FootballCamp} from "../football-camp/football-camp";

@Component({
  selector: 'football-camp-map',
  templateUrl: 'football-camp-map.component.html',
  styleUrls: ['football-camp-map.component.scss'],
  providers: [FootballCampService]
})
export class FootballCampMapComponent implements OnInit {

  footballCampIdSelected: FootballCampMarker;

  footballCamps: FootballCamp[];

  constructor(private footballCampService: FootballCampService) {
    this.footballCampIdSelected = null;
  }

  ngOnInit(): void {
    this.footballCampService
      .getFootballCamps()
      .then(footballCamps => this.footballCamps = footballCamps);
  }

  onFootballCampMarkerClicked(id: number) {
    this.footballCampIdSelected = this.footballCamps[id];
    console.log(this.footballCampIdSelected);
  }
}
