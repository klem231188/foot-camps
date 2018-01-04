import {Component, OnInit} from '@angular/core';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Session} from '../../models/session';
import {Registration} from '../../models/registration';
import {FootballCamp} from '../../models/football-camp';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'football-camp-overview',
  templateUrl: 'football-camp-overview.component.html',
  styleUrls: ['football-camp-overview.component.scss']
})
export class FootballCampOverviewComponent implements OnInit {

  footballCamp: FootballCamp = null;

  session: Session = null;

  registrations: Registration[] = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private footballCampService: FootballCampService,
              private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.afs.doc<FootballCamp>('camps/SaZez1BrGCbuOdduv2Km').valueChanges().subscribe((footballCamp: FootballCamp) => {
        console.log(footballCamp);
      }
    );

    this.route
      .params
      .map((params: Params) => {
        console.log(params);
        const campId: string = params['id']
        this.afs.doc<FootballCamp>('camps/' + campId).valueChanges().subscribe((footballCamp: FootballCamp) => {
            console.log(footballCamp);
            this.footballCamp = footballCamp;
          }
        )
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
