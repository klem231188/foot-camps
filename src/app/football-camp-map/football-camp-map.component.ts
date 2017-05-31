import {Component, OnInit} from "@angular/core";
import {FootballCampMarkerService} from "./football-camp-marker.service";
import {FootballCampMarker} from "./football-camp-marker";

@Component({
  selector: 'football-camp-map',
  templateUrl: 'football-camp-map.component.html',
  styleUrls: ['football-camp-map.component.scss'],
  providers: [FootballCampMarkerService]
})
export class FootballCampMapComponent implements OnInit {

  footballCampMarkerSelected: FootballCampMarker;

  footballCampMarkers: FootballCampMarker[];

  constructor(private footballCampMarkerService: FootballCampMarkerService) {
    this.footballCampMarkerSelected = null;
  }

  ngOnInit(): void {
    this.footballCampMarkerService
      .getFootballCampMarkers()
      .then(footballCampMarkers => this.footballCampMarkers = footballCampMarkers);
  }

  onFootballCampMarkerClicked(footballCampMarker: FootballCampMarker) {
    this.footballCampMarkerSelected = footballCampMarker;
    console.log(this.footballCampMarkerSelected);
  }
}
