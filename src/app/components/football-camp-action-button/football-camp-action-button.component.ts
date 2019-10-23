import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-football-camp-action-button',
  templateUrl: './football-camp-action-button.component.html',
  styleUrls: ['./football-camp-action-button.component.scss']
})
export class FootballCampActionButtonComponent implements OnInit {

  @Input() action: string;

  constructor() { }

  ngOnInit() {
  }

}
