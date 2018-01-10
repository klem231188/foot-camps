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

  currentFootballCamp: FootballCamp = null;
  footballCamp$: Observable<FootballCamp>;
  footballCamps: FootballCamp[] = null;
  filteredFootballCamps$: Observable<FootballCamp[]>;
  searchInput: FormControl = new FormControl();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private angularFirestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.footballCamp$ = this.route
      .params
      .switchMap((params: Params) => {
        const campId: string = params['id'];
        return this.angularFirestore.doc<FootballCamp>(`camps/${campId}`).valueChanges();
      });

    this.footballCamp$.subscribe((footballCamp: FootballCamp) => {
      this.searchInput.setValue(footballCamp);
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
      this.footballCamps = footballCamps;
    });

    this.filteredFootballCamps$ = this.searchInput.valueChanges
      .map<any, FootballCamp[]>(value => {
        console.log('this.footballCamps' + this.footballCamps);
        if (this.footballCamps) {
          return this.footballCamps.filter((footballCamp) => {
            value = ((typeof value === 'string') && value) ? value : '';
            return footballCamp.city.toLowerCase().startsWith(value.toLowerCase());
          });
        } else {
          return [];
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
