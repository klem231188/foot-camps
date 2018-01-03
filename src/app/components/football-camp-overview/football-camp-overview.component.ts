import {Component, OnInit} from '@angular/core';
import {FootballCamp} from '../../services/football-camp/football-camp';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Session} from "../../models/session";
import {Registration} from "../../models/registration";

@Component({
  selector: 'football-camp-overview',
  templateUrl: 'football-camp-overview.component.html',
  styleUrls: ['football-camp-overview.component.scss']
})
export class FootballCampOverviewComponent implements OnInit {

  footballCamp: FootballCamp = null;

  session: Session;

  registrations: Registration[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private footballCampService: FootballCampService,
              private afs: AngularFirestore) {
    const sessionDoc: AngularFirestoreDocument<Session> = afs.doc<Session>('sessions/Lp4PUMsZrJznyssU0hpI');
    //TODO unsubscribe
    sessionDoc.valueChanges().subscribe(session => {
        this.session = session;
        // TODO : Modifier la query + unsubscribe
        const registrationCol: AngularFirestoreCollection<Registration> = afs.collection<Registration>('registrations', ref => ref.where('id', '==', '8vojUPPmKy54w3lseTEe'));
        registrationCol.valueChanges().subscribe(registrations => {
          this.registrations = registrations;
        })
      }
    );
  }

  ngOnInit(): void {
    this.route
      .params
      .switchMap((params: Params) => {
        return this.footballCampService.getFootballCamp(+params['id']);
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp;
      });
  }

  onDetailsClicked(): void {
    this.router.navigate(['/locate', this.footballCamp.id, 'details']);
  }
}
