import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service';
import {Payment} from '../../models/payment';

@Component({
  selector: 'app-football-camp-registration-payment',
  templateUrl: './football-camp-registration-payment.component.html',
  styleUrls: ['./football-camp-registration-payment.component.scss']
})
export class FootballCampRegistrationPaymentComponent implements AfterViewInit, OnInit {

  @Input() amount: number;
  card: any;
  @ViewChild('payElement') payElement;
  @ViewChild('payErrorElement') payErrorElement;

  constructor(private paymentService: PaymentService) {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationPaymentComponent.ngOnInit()');
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

  stripeTokenHandler(stripeTokenId: number): void {
    console.log(`FootballCampPaymentComponent.stripeTokenHandler(${stripeTokenId})`);
    const payment: Payment = {
      registrationId: '123456879',
      stripeTokenId: stripeTokenId
    };

    this.paymentService.save(payment);
  }
}
