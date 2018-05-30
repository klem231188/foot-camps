
import {filter} from 'rxjs/operators';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

import {MatDialog} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import {environment} from '../../../environments/environment';
import * as firebase from 'firebase';

@Component({
  selector: 'football-camp-header',
  templateUrl: 'football-camp-header.component.html',
  styleUrls: ['football-camp-header.component.scss']
})
export class FootballCampHeaderComponent implements OnInit {

  backUrl: string = null;

  userInfo: firebase.UserInfo = null;

  @Output() onMenuClickedEvent = new EventEmitter<any>();

  environment: any = null;

  constructor(private router: Router,
              private dialog: MatDialog,
              private angularFireAuth: AngularFireAuth) {

    this.environment = environment;
    console.log(`environment : ${JSON.stringify(this.environment)}`)
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        if (/^\/registration\/\w+$/i.test(event.url)) {
          // registration/:id
          this.backUrl = event.url.replace('registration', 'locate');
          this.backUrl += '/details';
          console.log(this.backUrl);
        } else if (/^\/locate\/\w+\/details$/i.test(event.url)) {
          // locate/:id/details
          this.backUrl = event.url.replace('/details', '');
          console.log(this.backUrl);
        } else if (/^\/locate\/\w+$/i.test(event.url)) {
          // locate/:id
          this.backUrl = '/locate';
          console.log(this.backUrl);
        } else if (/^\/locate$/i.test(event.url)) {
          // locate
          this.backUrl = null;
          console.log(this.backUrl);
        }
      });

    this.angularFireAuth.authState.subscribe((firebaseUser) => {
      this.userInfo = firebaseUser;
      console.log('firebase.userInfo : ' + JSON.stringify(this.userInfo));
    });
  }

  onBackClicked(): void {
    this.router.navigate([this.backUrl]);
  }

  onMenuClicked(): void {
    this.onMenuClickedEvent.emit();
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  logout(): void {
    this.angularFireAuth.auth.signOut();
  }
}
