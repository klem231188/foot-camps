import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { FootballCampService } from './services/football-camp/football-camp.service';
import { MdSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [FootballCampService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  @ViewChild(MdSidenav)
  private sidenav: MdSidenav;

  constructor(private footballCampService: FootballCampService, private router: Router) {
  }

  onFindFootballCampsClicked(): void {
    this.sidenav.toggle();
    this.router.navigate(['/locate']);
  }
}
