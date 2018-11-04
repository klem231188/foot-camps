import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service';
import {Payment} from '../../models/payment';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-football-camp-registration-payment',
  templateUrl: './football-camp-registration-payment.component.html',
  styleUrls: ['./football-camp-registration-payment.component.scss']
})
export class FootballCampRegistrationPaymentComponent implements AfterViewInit, OnInit {

  // Fields
  @Output() isValid: BehaviorSubject<boolean>;
  @Input() amount: number;
  card: any;
  @ViewChild('payElement') payElement;
  @ViewChild('payErrorElement') payErrorElement;

  payment: Observable<Payment>;

  constructor(private paymentService: PaymentService,
              private angularFirestore: AngularFirestore) {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationPaymentComponent.ngOnInit()');
    this.isValid = new BehaviorSubject<boolean>(false);
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
    // TODO 1) Save registration in /registrations
    // TODO 2) Save payment in /payments then get valueChanges of payment with paymentId
    // if payment.state == PENDING isLoading.next(true)
    // else if == FAILED isLoading.next(false) && isValid.next(false)
    // else isLoading.next(false) &&  isValid.next(true)

    const payment: Payment = {
      registrationId: '123456879',
      stripeTokenId: stripeTokenId
    };

    this.paymentService
      .save(payment)
      .then(docRef => {
        const paymentId: string = docRef.id;
        this.payElement = this.angularFirestore
          .doc(`/payments/${paymentId}`)
          .valueChanges()
          .subscribe((value) => console.log(value));
      });

    // TODO then call HTTP function to execute payment
    // onSuccess --> this.isValid.next(false) && let user try again
  }
}
