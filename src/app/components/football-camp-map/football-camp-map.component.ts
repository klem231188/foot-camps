import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {FootballCamp} from '../../models/football-camp';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'football-camp-map',
  templateUrl: 'football-camp-map.component.html',
  styleUrls: ['football-camp-map.component.scss']
})
export class FootballCampMapComponent implements OnInit {

  footballCamps$: Observable<FootballCamp[]>;

  zoom: number;

  constructor(private router: Router,
              private afs: AngularFirestore) {
    this.zoom = window.screen.width > 960 ? 6 : 5;
  }

  ngOnInit(): void {
    this.footballCamps$ = this.afs
      .collection<FootballCamp>('camps')
      .snapshotChanges()
      .map(documentChangeActions => {
        // map on Observable here ! --> We 'map' each element/event of the observable
        return documentChangeActions.map(documentChangeAction => {
          // map on Array here ! --> We 'map' each element of the array
            const footballCamp = documentChangeAction.payload.doc.data() as FootballCamp;
            footballCamp.id = documentChangeAction.payload.doc.id;
            return footballCamp;
          });
      });
  }

  onMarkerClicked(footballCampId: number) {
    this.router.navigate(['/locate', footballCampId]);
  }
}
