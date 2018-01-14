import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {FootballCamp} from '../../models/football-camp';
import 'rxjs/add/operator/map';

@Component({
  selector: 'football-camp-overview',
  templateUrl: 'football-camp-overview.component.html',
  styleUrls: ['football-camp-overview.component.scss']
})
export class FootballCampOverviewComponent implements OnInit, OnDestroy {

  @Input() footballCamp: FootballCamp = null;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('FootballCampOverviewComponent.ngOnInit()');
  }

  ngOnDestroy(): void {
    console.log('FootballCampOverviewComponent.ngOnDestroy()');
  }

  onDetailsClicked(): void {
    this.router.navigate(['/locate', this.footballCamp.id, 'details']);
  }
}
