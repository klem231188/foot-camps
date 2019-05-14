import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-football-camp-home',
  templateUrl: './football-camp-home.component.html',
  styleUrls: ['./football-camp-home.component.scss']
})
export class FootballCampHomeComponent implements OnInit {

  proportion = 25;
  hideArrows = false;

  slides = [
    {
      image: './assets/img/home/1.jpeg'
    },
    {
      image: './assets/img/home/2.jpeg'
    },
    {
      image: './assets/img/home/3.jpeg'
    },
    {
      image: './assets/img/home/4.jpeg'
    },
    {
      image: './assets/img/home/5.jpeg'
    }
  ];

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 800px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.proportion = 25;
          this.hideArrows = false;
        } else {
          this.proportion = 50;
          this.hideArrows = true;
        }
      });
  }

}
