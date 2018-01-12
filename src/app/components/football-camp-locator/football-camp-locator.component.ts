import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {FootballCamp} from '../../models/football-camp';

@Component({
  selector: 'football-camp-locator',
  templateUrl: 'football-camp-locator.component.html'
})
export class FootballCampLocatorComponent implements OnInit {

  footballCamp: FootballCamp = null;
  footballCamps: FootballCamp[] = [];
  filteredFootballCamps: FootballCamp[] = [];
  searchInput: FormControl = new FormControl();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    // TODO faire du switchMap
    this.searchInput.valueChanges
      .map<any, FootballCamp[]>(value => {
        return this.footballCamps.filter((footballCamp) => {
          value = ((typeof value === 'string') && value) ? value : '';
          return footballCamp.city.toLowerCase().startsWith(value.toLowerCase());
        });
      })
      .subscribe(filteredFootballCamps => {
        console.log('this.filteredFootballCamps : ' + filteredFootballCamps);
        this.filteredFootballCamps = filteredFootballCamps;
      });

    this.route.params
      .map<Params, string>((params: Params) => {
        console.log(params['id'])
        return params['id'];
      })
      .subscribe(campId => {
        // Find footballCamp
        this.footballCampService
          .getFootballCamp(campId)
          .subscribe((footballCamp: FootballCamp) => {
            this.footballCamp = footballCamp;

            // Update searchInput
            if (this.footballCamp) {
              this.searchInput.setValue(this.footballCamp.city);
            }
          })
          .unsubscribe();
      });

    this.footballCampService
      .getFootballCamps()
      .subscribe((footballCamps: FootballCamp[]) => {
        console.log(footballCamps);
        // Save footballCamps
        this.footballCamps = footballCamps;

        // Reset searchInput if needed
        if (this.searchInput.value == null) {
          this.searchInput.reset();
        }
      });
  }

  displayFn(footballCamp: FootballCamp): string {
    return footballCamp ? footballCamp.city : '';
  }

  onFootballCampSelected(footballCamp: FootballCamp): void {
    console.log(footballCamp);
    this.router.navigate([`/locate/${footballCamp.id}`]);
  }

  onCloseClicked(): void {
    this.router.navigate(['/locate']);
  }
}
