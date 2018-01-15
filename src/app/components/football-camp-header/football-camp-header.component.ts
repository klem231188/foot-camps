import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { FootballCampLoginComponent } from 'app/components/football-camp-login/football-camp-login.component';
import 'rxjs/add/operator/filter';
import { MatDialog } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'football-camp-header',
  templateUrl: 'football-camp-header.component.html',
  styleUrls: ['football-camp-header.component.scss']
})
export class FootballCampHeaderComponent implements OnInit {

  backUrl: string = null;

  isUserLogged = false;

  @Output() onMenuClickedEvent = new EventEmitter<any>();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private angularFireAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.router.events
      .filter(event => event instanceof NavigationStart)
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
        console.log('before this.isUserLogged : ' +  this.isUserLogged);
        this.isUserLogged = (firebaseUser  && firebaseUser.uid) ? true : false;
        console.log('after this.isUserLogged : ' + this.isUserLogged);
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
