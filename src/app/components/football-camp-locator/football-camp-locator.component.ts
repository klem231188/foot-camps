import {Component, OnInit} from "@angular/core";
import {FootballCampService} from "../../services/football-camp/football-camp.service";
import {FootballCamp} from "../../services/football-camp/football-camp";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'football-camp-locator',
  templateUrl: 'football-camp-locator.component.html'
})
export class FootballCampLocatorComponent implements OnInit {

  footballCamp: FootballCamp = null;
  footballCamps: FootballCamp[];
  //observableFootballCamps: Observable<FootballCamp[]>;
  searchFootballCampInput: FormControl = new FormControl();

  constructor(private route: ActivatedRoute,
              private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.route
      .params
      .switchMap((params: Params) => {
        return this.footballCampService.getFootballCamp(+params['id'])
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp
      });

    this.footballCampService
      .getFootballCamps()
      .then(footballCamps => this.footballCamps = footballCamps);

    // this.observableFootballCamps = this.searchFootballCampInput.valueChanges
    //   .startWith(null)
    //   .map(value => value ? this.filter(value) : this.footballCamps.slice());
  }

  // filter(val: string): FootballCamp[] {
  //   return this.footballCamps.filter(footballCamp => footballCamp.city.toLowerCase().indexOf(val.toLowerCase()) === 0);
  // }

}
