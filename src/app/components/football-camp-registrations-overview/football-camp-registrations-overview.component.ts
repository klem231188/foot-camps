import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {RegistrationService} from '../../services/registration/registration.service';
import {BehaviorSubject} from 'rxjs';
import {Registration} from '../../models/registration';
import {RegistrationV2} from '../../models/registration-v2.model';

@Component({
  selector: 'app-football-camp-registrations-overview',
  templateUrl: './football-camp-registrations-overview.component.html',
  styleUrls: ['./football-camp-registrations-overview.component.scss']
})
export class FootballCampRegistrationsOverviewComponent implements OnInit, OnChanges, OnDestroy {

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
