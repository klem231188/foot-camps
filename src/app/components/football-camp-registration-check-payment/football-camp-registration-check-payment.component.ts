import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {FootballCamp} from '../../models/football-camp';
import {SessionService} from '../../services/session/session.service';
import {Session} from '../../models/session';
import {map} from 'rxjs/operators';
import {PaymentService} from '../../services/payment/payment.service';
import {Payment} from '../../models/payment';
import {PaymentState} from '../../models/payment-state.enum';
import {PaymentType} from '../../models/payment-type.enum';
import {RegistrationService} from '../../services/registration/registration.service';
import {RegistrationV2} from '../../models/registration-v2.model';
import {RegistrationState} from '../../models/registration-state.enum';

@Component({
  selector: 'app-football-camp-registration-check-payment',
  templateUrl: './football-camp-registration-check-payment.component.html',
  styleUrls: ['./football-camp-registration-check-payment.component.scss']
})
export class FootballCampRegistrationCheckPaymentComponent implements OnInit, OnChanges {

  @Output() isValid: BehaviorSubject<boolean>;
  @Input() campId: string;
  @Input() sessionId: string;
  @Input() registration: RegistrationV2;

  footballCamp$: Observable<FootballCamp>;
  session$: Observable<Session>;
  isButtonDisabled: boolean;

  constructor(
    private footballCampService: FootballCampService,
    private sessionService: SessionService,
    private paymentService: PaymentService,
    private registrationService: RegistrationService,
  ) {
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationCheckPaymentComponent.ngOnInit()');
    this.isValid = new BehaviorSubject<boolean>(false);
    this.isButtonDisabled = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FootballCampRegistrationCheckPaymentComponent.ngOnChanges()');
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

  onPayLater(): void {
    console.log('FootballCampRegistrationCheckPaymentComponent.onPayLater()');

    this.isButtonDisabled = true;

    const payment: Payment = {
      registrationId: this.registration.id,
      state: PaymentState.IN_PROGRESS,
      type: PaymentType.OTHER,
      stripeTokenId: null
    };

    this.paymentService
      .save(payment)
      .then(() => {
        console.log('Payment created in firestore');
        return this.registrationService.update(this.registration, {paymentId: payment.id, state: RegistrationState.IN_PROGRESS})
      })
      .then(() => {
        console.log('Registration updated in firestore');
        this.isValid.next(true);
        this.isButtonDisabled = false;
      })
      .catch((error) => {
        console.log('An error occured', error);
        this.isButtonDisabled = false;
      })
  }
}
