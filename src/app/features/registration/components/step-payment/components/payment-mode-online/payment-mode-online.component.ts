import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StripeCardElementChangeEvent, StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {FootballCamp} from '../../../../../../models/football-camp';
import {RegistrationV2} from '../../../../../../models/registration-v2.model';
import {Session} from '../../../../../../models/session';
import {FootballCampService} from '../../../../../../services/football-camp/football-camp.service';
import {SessionService} from '../../../../../../services/session/session.service';
import {Payment} from '../../../../../../models/payment';
import {PaymentState} from '../../../../../../models/payment-state.enum';
import {PaymentType} from '../../../../../../models/payment-type.enum';
import {RegistrationState} from '../../../../../../models/registration-state.enum';
import {PaymentService} from '../../../../../../services/payment/payment.service';
import {RegistrationService} from '../../../../../../services/registration/registration.service';
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PaymentMode} from '../../../../../../models/payment-mode.enum';

@Component({
  selector: 'app-payment-mode-online',
  templateUrl: './payment-mode-online.component.html',
  styleUrls: ['./payment-mode-online.component.scss']
})
export class PaymentModeOnlineComponent implements OnInit, OnChanges {

  @Input() campId: string;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#64ffda',
        color: '#64ffda',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'fr',
  };
  errorMessage: string;
  footballCamp$: Observable<FootballCamp>;
  isButtonDisabled: boolean;
  isReducedPrice: boolean;
  isProcessingPayment: boolean;
  @Output() isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() registration: RegistrationV2;
  session$: Observable<Session>;
  @Input() sessionId: string;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private footballCampService: FootballCampService,
    private sessionService: SessionService,
    private registrationService: RegistrationService,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private snackBar: MatSnackBar
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
    this.isButtonDisabled = true;
    this.isProcessingPayment = false;
    this.isReducedPrice = false;
  }

  onChange(event: StripeCardElementChangeEvent) {
    this.isButtonDisabled = event.empty;
    this.errorMessage = event.error ? event.error.message : '';
  }

  async pay() {
    try {
      this.isButtonDisabled = true;
      this.isProcessingPayment = true;

      const payment: Payment = {
        registrationId: this.registration.id,
        state: PaymentState.IN_PROGRESS,
        type: PaymentType.CARD,
        mode: PaymentMode.ONLINE,
        halfBoard: true,
        reducedPrice: this.isReducedPrice
      };

      console.log('Creating payment in firestore');
      await this.paymentService.save(payment);
      console.log('Payment created in firestore');

      console.log('Creating payment intent');
      const paymentIntent = await this.paymentService.createPaymentIntent(payment.id).toPromise();
      console.log('Payment intent created');

      console.log('Doing payment');
      const paymentResult = await this.stripeService.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: {
          card: this.card.element,
          billing_details: {
            name: payment.id,
          },
        },
        receipt_email: this.registration.trainee.email
      }).toPromise();
      this.isProcessingPayment = false;
      console.log('Payment done');

      if (paymentResult.error) {
        console.log('An error occured during payment');
        this.isButtonDisabled = false;
        this.errorMessage = paymentResult.error.message;

        console.log('Updating payment status in firestore');
        await this.paymentService.update(payment.id, {state: PaymentState.REJECTED});
        console.log('Payment status updated in firestore');
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          this.snackBar.open('Paiement effectué avec succès', 'Fermer', {
            duration: 10000,
          });
          this.isValid.next(true);

          console.log('Updating payment status in firestore');
          await this.paymentService.update(payment.id, {state: PaymentState.ACCEPTED});
          console.log('Payment status updated in firestore');

          console.log('Updating registration status in firestore');
          await this.registrationService.update(this.registration.id, {paymentId: payment.id, state: RegistrationState.IN_PROGRESS});
          console.log('Registration status updated in firestore');
        }
      }
    } catch (e) {
      this.snackBar.open('Une erreur inattendue est survenue: ' + e, 'Fermer', {
        duration: 10000,
      });
      this.isButtonDisabled = false;
      this.isProcessingPayment = false;
    }
  }
}
