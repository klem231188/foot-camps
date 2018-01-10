import {Component, OnInit} from '@angular/core';
import {FootballCamp} from '../../services/football-camp/football-camp';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';

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
              private angularFirestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .map<any, FootballCamp[]>(value => {
        return this.footballCamps.filter((footballCamp) => {
          value = ((typeof value === 'string') && value) ? value : '';
          return footballCamp.city.toLowerCase().startsWith(value.toLowerCase());
        });
      })
      .subscribe(filteredFootballCamps => {
        console.log('this.filteredFootballCamps : ' + this.filteredFootballCamps);
        this.filteredFootballCamps = filteredFootballCamps;
      });

    this.angularFirestore
      .collection<FootballCamp>('camps')
      .snapshotChanges()
      .map<DocumentChangeAction[], FootballCamp[]>(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as FootballCamp;
          data.id = action.payload.doc.id;
          return data as FootballCamp;
        });
      }).subscribe((footballCamps: FootballCamp[]) => {
      console.log('this.footballCamps  : ' + this.footballCamps);
      this.footballCamps = footballCamps;

      this.route
        .params
        .map((params: Params) => {
          const campId: string = params['id'];
          return this.footballCamps
            .find(footballCamp => {
              return campId === footballCamp.id;
            });
        }).subscribe(footballCamp => {
        this.footballCamp = footballCamp;
        this.searchInput.setValue(this.footballCamp.city);
      });
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
