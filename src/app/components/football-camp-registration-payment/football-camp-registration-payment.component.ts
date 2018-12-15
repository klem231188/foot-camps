import {
  AfterViewChecked,
  AfterViewInit,
  Component, ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {PaymentService} from '../../services/payment/payment.service';
import {Payment} from '../../models/payment';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PaymentState} from '../../models/payment-state.enum';
import {MatButton, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-football-camp-registration-payment',
  templateUrl: './football-camp-registration-payment.component.html',
  styleUrls: ['./football-camp-registration-payment.component.scss']
})
export class FootballCampRegistrationPaymentComponent implements AfterViewInit, AfterViewChecked, OnInit, OnChanges {

  // Fields
  @Output() isValid: BehaviorSubject<boolean>;
  @Input() amount: number;
  @Input() registrationId: string;
  card: any;

  @ViewChild('payElement') set content(content: ElementRef) {
    this.card.mount(content.nativeElement);
  }
  @ViewChild('payErrorElement') payErrorElement;
  @ViewChild('payButton') payButton: MatButton;

  payment: Observable<Payment>;
  isLoading: boolean;

  constructor(private paymentService: PaymentService,
              private snackBar: MatSnackBar) {
    console.log('FootballCampRegistrationPaymentComponent.constructor');
    this.isLoading = false;
    this.isValid = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    console.log('FootballCampRegistrationPaymentComponent.ngOnInit()');
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
    this.card.addEventListener('change', ({error}) => {
      if (error) {
        this.payErrorElement.nativeElement.textContent = error.message;
      } else {
        this.payErrorElement.nativeElement.textContent = '';
      }
    });
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
  }

  ngAfterViewChecked(): void {
    console.log('FootballCampRegistrationPaymentComponent.ngAfterViewChecked()');
    if (this.payButton !== undefined) {
      if (!this.isLoading) {
        this.payButton.disabled = false;
      }
    }
  }

  onPay(): void {
    console.log('FootballCampRegistrationPaymentComponent.onPay()');

    this.payButton.disabled = true;
    this.paymentService
      .stripe
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

    this.snackBar.open('Paiement par carte en cours', 'Close', {
      duration: 3000,
    });

    const payment: Payment = {
      registrationId: this.registrationId,
      stripeTokenId: stripeTokenId,
      state: PaymentState.IN_PROGRESS
    };

    this.isLoading = true;
    this.paymentService
      .makePaymentByCard(payment)
      .subscribe(
        () => {
          this.isLoading = false;
          this.isValid.next(true);
          this.snackBar.open('Paiement par carte réussi', 'Close', {
            duration: 3000,
          });
        },
        () => {
          this.isLoading = false;
          this.isValid.next(false);
          this.snackBar.open('Erreur lors du paiement par carte.', 'Close', {
            duration: 10000,
          });
        });
  }
}
