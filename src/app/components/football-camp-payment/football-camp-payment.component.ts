import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service';

@Component({
  selector: 'app-football-camp-payment',
  templateUrl: './football-camp-payment.component.html',
  styleUrls: ['./football-camp-payment.component.scss']
})
export class FootballCampPaymentComponent implements AfterViewInit, OnInit {

  @Input() amount: number; // Total amount
  @Input() label: string; // Label for product/purchase

  elements: any;
  paymentRequest: any;
  prButton: any;

  // Element used to mount the button
  @ViewChild('payElement') payElement;

  constructor(private paymentService: PaymentService) {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');

    // 1. instantiate a paymentRequest object
    this.paymentRequest = this.paymentService.stripe.paymentRequest({
      country: 'FR',
      currency: 'eur',
      total: {
        amount: this.amount,
        label: this.label,
      },
    });

    // 2. initalize elements
    this.elements = this.paymentService.stripe.elements();


    // 3. register listener
    this.paymentRequest.on('source', async (event) => {
      console.log(event)

      // Fires when the user submits their card
      // Make an HTTP call to charge on the backend (using a timeout to simulate the response)
      setTimeout(() => {
        event.complete('success')
      }, 1000)
    });


    // // 4. create the button
    // this.prButton = this.elements.create('paymentRequestButton', {
    //   paymentRequest: this.paymentRequest,
    //   style: {
    //     paymentRequestButton: {
    //       type: 'buy', // 'default' | 'donate' | 'buy',
    //       theme: 'dark' // 'dark' | 'light' | 'light-outline',
    //     },
    //   }
    // });
    //
    // // 5. mount the button asynchronously
    // this.mountButton();

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

    // Create an instance of the card Element.
    const card = this.elements.create('card', {style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount(this.payElement.nativeElement);

    card.addEventListener('change', ({error}) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });
  }

  mountButton(): void {
    console.log('mountButton()');
    this.paymentRequest.canMakePayment()
      .then(result => {
        if (result) {
          this.prButton.mount(this.payElement.nativeElement);
        } else {
          console.error('your browser is old school!');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
