import {AfterViewInit, Component, Input, OnInit, OnChanges, Output, ViewChild, SimpleChanges, SimpleChange} from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service';
import {Payment} from '../../models/payment';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PaymentState} from '../../models/payment-state.enum';

@Component({
  selector: 'app-football-camp-registration-payment',
  templateUrl: './football-camp-registration-payment.component.html',
  styleUrls: ['./football-camp-registration-payment.component.scss']
})
export class FootballCampRegistrationPaymentComponent implements AfterViewInit, OnInit, OnChanges {

  // Fields
  @Output() isValid: BehaviorSubject<boolean>;
  @Input() amount: number;
  @Input() registrationId: string;
  card: any;
  @ViewChild('payElement') payElement;
  @ViewChild('payErrorElement') payErrorElement;

  payment: Observable<Payment>;

  constructor(private paymentService: PaymentService) {
    console.log('FootballCampRegistrationPaymentComponent.constructor');
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationPaymentComponent.ngOnInit()');
    this.isValid = new BehaviorSubject<boolean>(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FootballCampRegistrationPaymentComponent.ngOnChanges()');
    // Handle @Input registrationId change
    const registrationIdChange: SimpleChange = changes.registrationId;
    if (registrationIdChange) {
      this.registrationId = registrationIdChange.currentValue;
    }
  }

  ngAfterViewInit(): void {
    console.log('FootballCampRegistrationPaymentComponent.ngAfterViewInit()');

    const style = {
      base: {
        color: '#009688',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = this.paymentService.stripe.elements().create('card', {style});
    this.card.mount(this.payElement.nativeElement);

    this.card.addEventListener('change', ({error}) => {
      if (error) {
        this.payErrorElement.nativeElement.textContent = error.message;
      } else {
        this.payErrorElement.nativeElement.textContent = '';
      }
    });
  }

  onPay(): void {
    console.log('FootballCampRegistrationPaymentComponent.onPay()');
    this.paymentService.stripe
      .createToken(this.card)
      .then((result) => {
        if (result.error) {
          this.payErrorElement.nativeElement.textContent = result.error.message;
        } else {
          this.stripeTokenHandler(result.token.id);
        }
      });
  }

  stripeTokenHandler(stripeTokenId: string): void {
    console.log(`FootballCampPaymentComponent.stripeTokenHandler(${stripeTokenId})`);
    const payment: Payment = {
      registrationId: this.registrationId,
      stripeTokenId: stripeTokenId,
      state: PaymentState.IN_PROGRESS
    };

    this.paymentService
      .makePaymentByCard(payment)
      .subscribe((httpResponse) => {
        this.isValid.next(true);
      });

    // this.paymentService
    //   .save(payment)
    //   .then(() => this.isValid.next(true))
    // TODO not yet valid.
    // We should wait payment is accepted or rejected

    // TOO SLOW
    // should
    // 1) register payment in firestore with state in_progress
    // 2) make http call to trigger payment with stripe (knowing payment id)
    // --> on success update payment state to approved and registration state to in_progress
    // --> on error update payment state to rejected and registration state to rejected
    // --> return payment response state to front ui
  }
}
