import {Component} from "@angular/core";

@Component({
  selector: 'football-camp-map',
  templateUrl: 'football-camp-map.component.html',
  styleUrls: ['football-camp-map.component.scss']
})
export class FootballCampMapComponent {
  name: string;

  constructor() {
    this.name = 'Max'
  }

  onMarkerClicked() {
    console.log('My name is', this.name)
  }
}
