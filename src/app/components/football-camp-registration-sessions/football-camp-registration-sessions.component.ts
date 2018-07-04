import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SessionService} from '../../services/session/session.service';
import {Session} from '../../models/session';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-football-camp-registration-sessions',
  templateUrl: './football-camp-registration-sessions.component.html',
  styleUrls: ['./football-camp-registration-sessions.component.scss']
})
export class FootballCampRegistrationSessionsComponent implements OnInit, OnDestroy {

  // Fields
  @Input() campId: string;
  @Output() selectedSession: BehaviorSubject<Session>;
  sessions: Session[];
  isLoading: BehaviorSubject<boolean>;
  subscriptions: Subscription[];

  // Constructor
  constructor(private sessionService: SessionService) {
  }

  // Lifecycle hooks
  ngOnInit() {
    this.sessions = [];
    this.subscriptions = [];
    this.isLoading = new BehaviorSubject<boolean>(true);
    this.selectedSession = new BehaviorSubject<Session>(null);

    const sessionSub = this.sessionService
      .getSessionsFromCampId(this.campId)
      .subscribe((sessions: Session[]) => {
        this.sessions = sessions;
        this.isLoading.next(false);
      });
    this.subscriptions.push(sessionSub);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
