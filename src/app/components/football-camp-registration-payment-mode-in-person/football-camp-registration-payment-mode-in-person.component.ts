import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FootballCamp} from '../../models/football-camp';
import {RegistrationV2} from '../../models/registration-v2.model';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {map} from 'rxjs/operators';
import {PaymentType} from 'app/models/payment-type.enum';

@Component({
  selector: 'app-football-camp-registration-payment-mode-in-person',
  templateUrl: './football-camp-registration-payment-mode-in-person.component.html',
  styleUrls: ['./football-camp-registration-payment-mode-in-person.component.scss']
})
export class FootballCampRegistrationPaymentModeInPersonComponent implements OnInit, OnChanges {

  PaymentType = PaymentType;
  @Input() campId: string;
  footballCamp$: Observable<FootballCamp>;
  isButtonDisabled: boolean;
  @Output() isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() registration: RegistrationV2;
  session$: Observable<Session>;
  @Input() sessionId: string;

  constructor(
    private footballCampService: FootballCampService,
    private sessionService: SessionService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FootballCampRegistrationPaymentModeInPersonComponent.ngOnChanges()');
    if (changes['campId'] !== null) {
      this.footballCamp$ = this.footballCampService.getFootballCamp(this.campId);
    }

    if (changes['sessionId'] !== null) {
      this.session$ = this.sessionService
        .getSessionsFromCampId(this.campId)
        .pipe(
          map((sessions: Session[]) => {
            return sessions.find(session => session && session.id === this.sessionId)
          })
        );
    }
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationPaymentModeInPersonComponent.ngOnInit()');
    this.isButtonDisabled = false;
  }

  onPay() {
    this.isValid.next(true);
    this.isButtonDisabled = true;
  }
}
