import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FootballCamp} from '../../models/football-camp';
import {RegistrationV2} from '../../models/registration-v2.model';
import {Session} from '../../models/session';
import {FootballCampService} from '../../services/football-camp/football-camp.service';
import {SessionService} from '../../services/session/session.service';
import {map} from 'rxjs/operators';
import {PaymentType} from 'app/models/payment-type.enum';
import {Payment} from '../../models/payment';
import {PaymentState} from '../../models/payment-state.enum';
import {PaymentMode} from '../../models/payment-mode.enum';
import {PaymentService} from '../../services/payment/payment.service';

@Component({
  selector: 'app-football-camp-registration-payment-mode-by-mail',
  templateUrl: './football-camp-registration-payment-mode-by-mail.component.html',
  styleUrls: ['./football-camp-registration-payment-mode-by-mail.component.scss']
})
export class FootballCampRegistrationPaymentModeByMailComponent implements OnInit, OnChanges {
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
    private sessionService: SessionService,
    private paymentService: PaymentService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FootballCampRegistrationPaymentModeByMailComponent.ngOnChanges()');
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
    console.log('FootballCampRegistrationPaymentModeByMailComponent.ngOnInit()');
    this.isButtonDisabled = false;
  }

  async onPay() {
    this.isButtonDisabled = true;

    const payment: Payment = {
      registrationId: this.registration.id,
      state: PaymentState.IN_PROGRESS,
      type: null,
      mode: PaymentMode.IN_PERSON,
      halfBoard: true,
      reducedPrice: false
    };

    console.log('Creating payment in firestore');
    await this.paymentService.save(payment);
    console.log('Payment created in firestore');

    this.isValid.next(true);
  }
}
