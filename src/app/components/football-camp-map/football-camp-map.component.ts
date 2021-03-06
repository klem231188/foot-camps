import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FootballCamp} from '../../models/football-camp';


@Component({
  selector: 'football-camp-map',
  templateUrl: 'football-camp-map.component.html',
  styleUrls: ['football-camp-map.component.scss']
})
export class FootballCampMapComponent implements OnInit, OnDestroy {

  @Input() footballCamps: FootballCamp[];

  zoom: number;

  constructor(private router: Router) {
    this.zoom = window.screen.width > 960 ? 10 : 7;
  }

  ngOnInit(): void {
    console.log('FootballCampMapComponent.ngOnInit()');
  }

  ngOnDestroy(): void {
    console.log('FootballCampMapComponent.ngOnDestroy()');
  }

  onMarkerClicked(footballCampId: string) {
    this.router.navigate(['/locate', footballCampId]);
  }
}
