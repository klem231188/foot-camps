import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-football-camp-badge',
  templateUrl: './football-camp-badge.component.html',
  styleUrls: ['./football-camp-badge.component.scss']
})
export class FootballCampBadgeComponent implements OnInit {

  @Input() subtitle: string;
  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
