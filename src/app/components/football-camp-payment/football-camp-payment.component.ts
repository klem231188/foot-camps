import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service';

@Component({
  selector: 'app-football-camp-payment',
  templateUrl: './football-camp-payment.component.html',
  styleUrls: ['./football-camp-payment.component.scss']
})
export class FootballCampPaymentComponent implements AfterViewInit, OnInit {

  @Input() amount: number;
  card: any;
  @ViewChild('payElement') payElement;
  @ViewChild('payErrorElement') payErrorElement;

  constructor(private paymentService: PaymentService) {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('FootballCampPaymentComponent.ngOnInit()');
  }

  ngAfterViewInit(): void {
    console.log('FootballCampPaymentComponent.ngAfterViewInit()');

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
    console.log('FootballCampPaymentComponent.onPay()');
    this.paymentService.stripe
      .createToken(this.card)
      .then((result) => {
        if (result.error) {
          this.payErrorElement.nativeElement.textContent = result.error.message;
        } else {
          this.stripeTokenHandler(result.token);
        }
      });
  }

  stripeTokenHandler(token): void {
    console.log(`FootballCampPaymentComponent.stripeTokenHandler(${JSON.stringify(token)})`);
    // TODO call firebase
  }
}
