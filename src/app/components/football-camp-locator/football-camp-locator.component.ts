import {map, switchMap} from 'rxjs/operators';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../models/football-camp';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'football-camp-locator',
  templateUrl: 'football-camp-locator.component.html'
})
export class FootballCampLocatorComponent implements OnInit, OnDestroy, AfterViewInit {

  filteredFootballCamps$: Observable<FootballCamp[]>;
  footballCamp$: Observable<FootballCamp>;
  footballCamps$: Observable<FootballCamp[]>;
  routeType: string;
  searchInput: FormControl = new FormControl();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService,
              private titleService: Title,
              private meta: Meta) {
  }

  displayFn(footballCamp: FootballCamp): string {
    console.log(`displayFn: ${JSON.stringify(footballCamp)}`);
    return footballCamp ? footballCamp.city : '';
  }

  ngAfterViewInit(): void {
    console.log('FootballCampLocatorComponent.ngAfterViewInit()');

    this.footballCamp$.subscribe(footballCamp => {
        console.log(footballCamp);
        if (footballCamp) {
          this.searchInput.setValue(footballCamp);
        } else {
          this.searchInput.setValue(null);
        }
      }
    );
  }

  ngOnDestroy(): void {
    console.log('FootballCampLocatorComponent.ngOnDestroy()');
  }

  ngOnInit(): void {
    console.log('FootballCampLocatorComponent.ngOnInit()');
    this.titleService.setTitle('Footcamps - Localiser un stage de football');
    this.meta.updateTag({name: 'description', content: 'Localiser un stage de football proche de chez vous.'});
    this.meta.updateTag({name: 'keywords', content: 'footcamps, footcamp, foot, camp, camps, stage, football, localiser, trouver'});

    this.footballCamps$ = this.footballCampService.getFootballCamps();

    this.filteredFootballCamps$ = this.searchInput.valueChanges.pipe(
      switchMap<any, Observable<FootballCamp[]>>(value => {
        return this.footballCamps$.pipe(
          map<FootballCamp[], FootballCamp[]>(footballCamps => {
            let city = '';
            if (!value) {
              city = '';
            } else if (value.city) {
              city = value.city;
            } else {
              city = value;
            }
            return footballCamps.filter((footballCamp) => {
              return footballCamp.city.toLowerCase().includes(city.toLowerCase());
            });
          }))
      }));

    this.footballCamp$ = this.route.params.pipe(
      switchMap<Params, Observable<FootballCamp>>((params: Params) => {
        return this.footballCampService.getFootballCamp(params['id']);
      }));

    this.routeType = 'locate';
    this.route.data
      .subscribe(data => this.routeType = data.type);
  }

  onCloseClicked(): void {
    this.router.navigate(['/locate']);
  }

  onFootballCampSelected(footballCamp: FootballCamp): void {
    console.log('onFootballCampSelected');
    this.router.navigate([`/locate/${footballCamp.id}`]);
  }
}
