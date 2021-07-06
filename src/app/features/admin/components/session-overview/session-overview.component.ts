import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {RegistrationV2} from '../../../../models/registration-v2.model';
import {BehaviorSubject} from 'rxjs';
import {RegistrationService} from '../../../../services/registration/registration.service';

@Component({
  selector: 'app-session-overview',
  templateUrl: './session-overview.component.html',
  styleUrls: ['./session-overview.component.scss']
})
export class SessionOverviewComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  sessionId: string;

  loading: BehaviorSubject<boolean>;
  registrations: RegistrationV2[];

  constructor(
    private registrationService: RegistrationService
  ) {
  }

  countRegistrations(state: string) {
    return this.registrations
      .filter(registration => registration.state === state)
      .length;
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

  ngOnInit() {
    this.loading = new BehaviorSubject<boolean>(true);
  }

}
