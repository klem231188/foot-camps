import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../models/football-camp';

@Component({
  selector: 'football-camp-locator',
  templateUrl: 'football-camp-locator.component.html'
})
export class FootballCampLocatorComponent implements OnInit, OnDestroy, AfterViewInit {

  footballCamp$: Observable<FootballCamp>;
  footballCamps$: Observable<FootballCamp[]>;
  filteredFootballCamps$: Observable<FootballCamp[]>;
  searchInput: FormControl = new FormControl();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    console.log('FootballCampLocatorComponent.ngOnInit()');
    this.footballCamps$ = this.footballCampService.getFootballCamps();

    this.filteredFootballCamps$ = this.searchInput.valueChanges
      .switchMap<any, FootballCamp[]>(value => {
        return this.footballCamps$
          .map<FootballCamp[], FootballCamp[]>(footballCamps => {
            console.log(`value : ${value}`);
            const city: string = (value != null) ? ((value instanceof FootballCamp) ? value.city : value) : '';
            console.log(`city : ${city}`);
            return footballCamps.filter((footballCamp) => {
              return footballCamp.city.toLowerCase().startsWith(city.toLowerCase());
            });
          })
      });

    this.footballCamp$ = this.route.params
      .switchMap<Params, FootballCamp>((params: Params) => {
        return this.footballCampService.getFootballCamp(params['id']);
      });
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

  displayFn(footballCamp: FootballCamp): string {
    console.log('displayFn');
    return footballCamp ? footballCamp.city : '';
  }

  onFootballCampSelected(footballCamp: FootballCamp): void {
    console.log('onFootballCampSelected');
    this.router.navigate([`/locate/${footballCamp.id}`]);
  }

  onCloseClicked(): void {
    this.router.navigate(['/locate']);
  }
}
