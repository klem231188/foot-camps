import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {FootballCamp} from '../../models/football-camp';
import {ActivatedRoute, NavigationStart, Router, RoutesRecognized} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AngularFireAuth} from '@angular/fire/auth';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {filter, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() onMenuClickedEvent = new EventEmitter<any>();

  backUrl: string = null;
  environment: any = null;
  userInfo: firebase.UserInfo = null;
  selectedFootballCamp: BehaviorSubject<FootballCamp>;
  subscriptions: Subscription[];

  constructor(private router: Router,
              private dialog: MatDialog,
              private angularFireAuth: AngularFireAuth,
              private activatedRoute: ActivatedRoute,
              private footballCampService: FootballCampService) {
    this.subscriptions = [];
    this.selectedFootballCamp = new BehaviorSubject(null);
    this.environment = environment;
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  logout(): void {
    this.angularFireAuth.signOut();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    const subToRouter = this.router.events.pipe(
      filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        if (/^\/stages\/\w+\/inscription$/i.test(event.url)) {
          // stages/:id/inscription --> stages/:id/details
          this.backUrl = event.url.replace('/inscription', '/details');
          console.log(this.backUrl);
        } else if (/^\/stages\/\w+|-\/details$/i.test(event.url)) {
          // stages/:id/details --> accueil
          this.backUrl = event.url = 'accueil';
          console.log(this.backUrl);
        } else {
          this.backUrl = null;
          console.log(this.backUrl);
        }
      });

    const subToAuthState = this.angularFireAuth.authState
      .subscribe((firebaseUser) => {
        this.userInfo = firebaseUser;
      });

    const subToSelectedFootballCamp = this.router.events
      .pipe(
        filter(event => event instanceof RoutesRecognized),
        switchMap<RoutesRecognized, Observable<FootballCamp>>((event) => {
            if (event.state.root.firstChild.params.hasOwnProperty('id')) {
              const campId: string = event.state.root.firstChild.params.id;
              return this.footballCampService.getFootballCamp(campId);
            } else {
              return of(null);
            }
          }
        ))
      .subscribe(footballCamp => this.selectedFootballCamp.next(footballCamp));

    this.subscriptions.push(subToRouter, subToAuthState, subToSelectedFootballCamp);
  }

  onBackClicked(): void {
    this.router.navigate([this.backUrl]);
  }

  onMenuClicked(): void {
    this.onMenuClickedEvent.emit();
  }
}
