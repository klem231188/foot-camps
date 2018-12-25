import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {RegistrationV2} from '../../../models/registration-v2.model';
import {BehaviorSubject} from 'rxjs';
import {RegistrationService} from '../../../services/registration/registration.service';

@Component({
  selector: 'app-football-camp-session-overview',
  templateUrl: './football-camp-session-overview.component.html',
  styleUrls: ['./football-camp-session-overview.component.scss']
})
export class FootballCampSessionOverviewComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  sessionId: string;

  registrations: RegistrationV2[];

  loading: BehaviorSubject<boolean>;

  constructor(private registrationService: RegistrationService) {

  }

  ngOnInit() {
    this.loading = new BehaviorSubject<boolean>(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    const sessionChange: SimpleChange = changes.sessionId;

    if (sessionChange.currentValue !== sessionChange.previousValue) {
      this.registrationService.getRegistrations(this.sessionId)
        .subscribe(
          (registrations) => {
            this.registrations = registrations;
            this.loading.next(false);
          }
        );
    }
    // TODO unsubscribe
  }

  ngOnDestroy(): void {
  }

  countRegistrations(state: string) {
    return this.registrations
      .filter(registration => registration.state === state)
      .length;
  }

}
