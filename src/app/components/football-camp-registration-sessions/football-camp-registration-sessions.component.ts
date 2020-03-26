import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SessionService} from '../../services/session/session.service';
import {Session} from '../../models/session';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-football-camp-registration-sessions',
  templateUrl: './football-camp-registration-sessions.component.html',
  styleUrls: ['./football-camp-registration-sessions.component.scss']
})
export class FootballCampRegistrationSessionsComponent implements OnInit, OnDestroy {

  @Input() campId: string;
  isLoading: BehaviorSubject<boolean>;
  @Output() isValid: BehaviorSubject<boolean>;
  @Output() selectedSession: BehaviorSubject<Session>;
  sessions: Session[];
  subscriptions: Subscription[];

  // Constructor
  constructor(private sessionService: SessionService) {
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    // Init fields
    this.sessions = [];
    this.subscriptions = [];
    this.isLoading = new BehaviorSubject<boolean>(true);
    this.selectedSession = new BehaviorSubject<Session>(null);
    this.isValid = new BehaviorSubject<boolean>(false);

    // React on sessions retrieved
    const sub1 = this.sessionService
      .getSessionsFromCampId(this.campId)
      .subscribe((sessions: Session[]) => {
        this.sessions = sessions;
        this.isLoading.next(false);
      });

    // React on session selected
    const sub2 = this.selectedSession
      .subscribe((session: Session) => {
        if (session != null) {
          this.isValid.next(true);
        }
      });

    // Store all subscriptions
    this.subscriptions.push(sub1);
    this.subscriptions.push(sub2);
  }
}
