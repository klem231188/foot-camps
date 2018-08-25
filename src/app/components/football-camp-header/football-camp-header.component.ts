import {filter, switchMap} from 'rxjs/operators';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router, RoutesRecognized} from '@angular/router';

import {MatDialog} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import {environment} from '../../../environments/environment';
import * as firebase from 'firebase';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {FootballCamp} from '../../models/football-camp';
import {Event} from '@angular/router/src/events';

@Component({
  selector: 'football-camp-header',
  templateUrl: 'football-camp-header.component.html',
  styleUrls: ['football-camp-header.component.scss']
})
export class FootballCampHeaderComponent implements OnInit, OnDestroy {

  backUrl: string = null;

  userInfo: firebase.UserInfo = null;

  @Output() onMenuClickedEvent = new EventEmitter<any>();

  environment: any = null;

  subscriptions: Subscription[];

  selectedFootballCamp: BehaviorSubject<FootballCamp>;

  constructor(private router: Router,
              private dialog: MatDialog,
              private angularFireAuth: AngularFireAuth,
              private activatedRoute: ActivatedRoute,
              private footballCampService: FootballCampService) {

    this.subscriptions = [];
    this.selectedFootballCamp = new BehaviorSubject(null);
    this.environment = environment;
    console.log(`environment : ${JSON.stringify(this.environment)}`)
  }

  ngOnInit(): void {
    const subToRouter = this.router.events.pipe(
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

    const subToAuthState = this.angularFireAuth.authState
      .subscribe((firebaseUser) => {
        this.userInfo = firebaseUser;
        console.log('firebase.userInfo : ' + JSON.stringify(this.userInfo));
      });

    const subToSelectedFootballCamp = this.router.events
      .pipe(
        filter(event => event instanceof RoutesRecognized),
        switchMap<RoutesRecognized, FootballCamp>((event) => {
            if (event.state.root.firstChild.params.hasOwnProperty('id')) {
              const campId: string = event.state.root.firstChild.params.id;
              return this.footballCampService.getFootballCamp(campId);
            } else {
              return Observable.of(null);
            }
          }
        ))
      .subscribe(footballCamp => this.selectedFootballCamp.next(footballCamp));

    this.subscriptions.push(subToRouter, subToAuthState, subToSelectedFootballCamp);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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
