import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FootballCamp} from '../../models/football-camp';

import {Meta, Title} from '@angular/platform-browser';
import {Session} from '../../models/session';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'football-camp-overview',
  templateUrl: 'football-camp-overview.component.html',
  styleUrls: ['football-camp-overview.component.scss']
})
export class FootballCampOverviewComponent implements OnInit, OnChanges, OnDestroy {

  @Input() footballCamp: FootballCamp;
  @Input() showDetailsButton: boolean;
  sessions: Session[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private sessionService: SessionService,
              private meta: Meta) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const footballCampChange = changes['footballCamp'];
    if (footballCampChange && !footballCampChange.isFirstChange()) {
      this.footballCamp = footballCampChange.currentValue as FootballCamp;
      this.sessionService
        .getSessionsFromCampId(this.footballCamp.id)
        .subscribe(((sessions) => {
          this.sessions = sessions
        }));
    }
  }

  ngOnDestroy(): void {
    console.log('FootballCampOverviewComponent.ngOnDestroy()');
  }

  ngOnInit(): void {
    console.log('FootballCampOverviewComponent.ngOnInit()');
    this.titleService.setTitle('Footcamps - Aperçu du stage de football ' + this.footballCamp.city);
    this.meta.updateTag({name: 'description', content: 'Aperçu du stage de football ' + this.footballCamp.city});
    this.meta.updateTag({name: 'keywords', content: 'footcamps, stage, football, aperçu'});

    this.sessionService
      .getSessionsFromCampId(this.footballCamp.id)
      .subscribe(((sessions) => {
        this.sessions = sessions
      }));
  }

  onDetailsClicked(): void {
    this.router.navigate(['/locate', this.footballCamp.id, 'details-v2']);
  }

  percentageOfRegistrations(session: Session): number {
    return ((session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted) / session.maximumNumberOfRegistrations) * 100;
  }
}
