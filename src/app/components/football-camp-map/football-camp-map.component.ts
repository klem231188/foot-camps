import {Component, OnInit} from '@angular/core';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../services/football-camp/football-camp';
import {Router} from '@angular/router';

@Component({
  selector: 'football-camp-map',
  templateUrl: 'football-camp-map.component.html',
  styleUrls: ['football-camp-map.component.scss']
})
export class FootballCampMapComponent implements OnInit {

  footballCamps: FootballCamp[];

  zoom: number;

  constructor(private router: Router,
              private footballCampService: FootballCampService) {
    this.zoom = window.screen.width > 960 ? 6 : 5;
  }

  ngOnInit(): void {
    this.footballCampService
      .getFootballCamps()
      .then(footballCamps => this.footballCamps = footballCamps);
  }

  onMarkerClicked(footballCampId: number) {
    this.router.navigate(['/locate', footballCampId]);
  }
}
