import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {FootballCamp} from '../../models/football-camp';
import 'rxjs/add/operator/map';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'football-camp-overview',
  templateUrl: 'football-camp-overview.component.html',
  styleUrls: ['football-camp-overview.component.scss']
})
export class FootballCampOverviewComponent implements OnInit, OnDestroy {

  @Input() footballCamp: FootballCamp = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private meta: Meta) {
  }

  ngOnInit(): void {
    console.log('FootballCampOverviewComponent.ngOnInit()');
    this.titleService.setTitle('Footcamps - Aperçu du stage de football ' + this.footballCamp.city);
    this.meta.updateTag({name: 'description', content: 'Aperçu du stage de football ' + this.footballCamp.city});
    this.meta.updateTag({name: 'keywords', content: 'footcamps, stage, football, aperçu'});
  }

  ngOnDestroy(): void {
    console.log('FootballCampOverviewComponent.ngOnDestroy()');
  }

  onDetailsClicked(): void {
    this.router.navigate(['/locate', this.footballCamp.id, 'details']);
  }
}
