import {filter, switchMap, throttleTime} from 'rxjs/operators';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, NavigationEnd, Params, Router, Scroll} from '@angular/router';
import * as _ from 'lodash';
import {FootballCamp} from '../../models/football-camp';
import {Session} from '../../models/session';
import {SessionService} from '../../services/session/session.service';
import {Meta, Title} from '@angular/platform-browser';
import {ViewportScroller} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'football-camp-details',
  templateUrl: 'football-camp-details.component.html',
  styleUrls: ['football-camp-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FootballCampDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  footballCamp: FootballCamp = null;

  sessions: Session[] = [];

  viewerOpened = false;

  fragment = '';

  @ViewChild('contentContainer')
  set onScrollContentContainer(contentContainer: ElementRef) {
    Observable.fromEvent(contentContainer.nativeElement, 'scroll')
      .pipe(
        throttleTime(50)
      )
      .subscribe(e => {
        const menuElements: NodeListOf<HTMLElement> = document.querySelectorAll('.menu');
        for (let i = 0; i < menuElements.length; i++) {
          const element: HTMLElement = menuElements.item(i);
          element.classList.remove('activated');
        }

        const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.scrollable');
        for (let i = 0; i < elements.length; i++) {
          const element: HTMLElement = elements.item(i);
          if (this.offsetTop(element) > 0) {
            document.querySelector('#' + element.id + '-menu').classList.add('activated');
            // TODO get error : Throttling history state changes to prevent the browser from hanging
           // history.replaceState(null, '', window.location.pathname + '#' + element.id);
            break;
          }
        }

        // TODO hanlde bottom --> registration activated
      });
  }

  constructor(private router: Router,
              private viewportScroller: ViewportScroller,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService,
              private sessionService: SessionService,
              private titleService: Title,
              private meta: Meta) {
  }

  offsetTop(el) {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  }

  ngOnInit(): void {
    console.log('FootballCampDetailsComponent.ngOnInit()');
    this.route
      .params.pipe(
      switchMap((params: Params) => {
        return this.footballCampService.getFootballCamp(params['id']);
      }))
      .subscribe((footballCamp: FootballCamp) => {
        console.log(footballCamp);
        this.footballCamp = footballCamp;
        this.titleService.setTitle('Footcamps - Détails du stage de football ' + this.footballCamp.city);
        this.meta.updateTag({name: 'description', content: 'Détails du stage de football ' + this.footballCamp.city});
        this.meta.updateTag({
          name: 'keywords',
          content: 'footcamps, stage, football, description, images, photos, détails, prix'
        });
      });

    this.route
      .params.pipe(
      switchMap((params: Params) => {
        return this.sessionService.getSessionsFromCampId(params['id']);
      }))
      .subscribe((sessions: Session[]) => {
        console.log(sessions);
        this.sessions = sessions;
      });
  }

  ngAfterViewInit(): void {
    console.log('FootballCampDetailsComponent.ngAfterViewInit()');
  }

  ngOnDestroy(): void {
    console.log('FootballCampDetailsComponent.ngOnDestroy()');
  }

  getHalfBoardRatesSessions(): Session[] {
    return _.reject(this.sessions, ['halfBoardRates', null]);
  }

  hasHalfBoardRatesSessions(): boolean {
    return !_.isEmpty(this.getHalfBoardRatesSessions());
  }

  getFullBoardRatesSessions(): Session[] {
    return _.reject(this.sessions, ['fullBoardRates', null]);
  }

  hasFullBoardRatesSessions(): boolean {
    return !_.isEmpty(this.getFullBoardRatesSessions());
  }

  percentageOfRegistrations(session: Session): number {
    return ((session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted) / session.maximumNumberOfRegistrations) * 100;
  }

  isViewerOpened(): boolean {
    return this.viewerOpened;
  }

  onViewerChange(viewerOpened: boolean) {
    console.log('Viewer isOpened = ' + viewerOpened);
    this.viewerOpened = viewerOpened;
  }

  private isAnchorActive(section: string): boolean {
    return location.href.indexOf(section) !== -1;
  }

  scrollTo(elementId: string) {
    window.location.hash = elementId;
  }
}
