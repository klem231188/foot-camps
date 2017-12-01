import { Component, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { FootballCampService } from './services/football-camp/football-camp.service';
import { MdSidenav } from '@angular/material';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from 'angularfire2/auth';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [FootballCampService, AngularFireAuth],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild(MdSidenav)
  private sidenav: MdSidenav;

  constructor(
    private footballCampService: FootballCampService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
  }

  onFindFootballCampsClicked(): void {
    this.sidenav.toggle();
    this.router.navigate(['/locate']);
  }
}
