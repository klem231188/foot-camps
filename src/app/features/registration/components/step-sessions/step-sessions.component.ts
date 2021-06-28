import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SessionService} from '../../../../services/session/session.service';
import {Session} from '../../../../models/session';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-step-sessions',
  templateUrl: './step-sessions.component.html',
  styleUrls: ['./step-sessions.component.scss']
})
export class StepSessionsComponent implements OnInit, OnDestroy {

  @Input() campId: string;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Output() isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Output() selectedSession: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
  sessions: Session[] = [];
  subscriptions: Subscription[] = [];

  // Constructor
  constructor(private sessionService: SessionService) {
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
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
          this.isValid.next(session !== null);
      });

    // Store all subscriptions
    this.subscriptions.push(sub1);
    this.subscriptions.push(sub2);
  }

  onSessionSelected(session: Session) {
    if ((session.numberOfRegistrationsInProgress + session.numberOfRegistrationsAccepted) < session.maximumNumberOfRegistrations) {
        this.selectedSession.next(session);
      }
  }
}
