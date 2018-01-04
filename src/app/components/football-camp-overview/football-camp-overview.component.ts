import {Component, OnInit} from '@angular/core';
import {FootballCamp} from '../../services/football-camp/football-camp';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Session} from '../../models/session';
import {Registration} from '../../models/registration';

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

    const sessionDoc: AngularFirestoreDocument<Session> = this.afs.doc<Session>('sessions/Lp4PUMsZrJznyssU0hpI');
    //TODO unsubscribe
    sessionDoc.snapshotChanges().subscribe(session => {
        this.session = session.payload.data() as Session;
        const sessionId: string = session.payload.id;
        // TODO : unsubscribe
        const registrationCol: AngularFirestoreCollection<Registration> = this.afs.collection<Registration>('registrations', ref => ref.where('sessionId', '==', sessionId));
        registrationCol.valueChanges().subscribe(registrations => {
          this.registrations = registrations;
        });
      }
    );
  }

  onDetailsClicked(): void {
    this.router.navigate(['/locate', this.footballCamp.id, 'details']);
  }
}
