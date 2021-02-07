import {Injectable} from '@angular/core';
import {Payment} from '../../models/payment';
import {AngularFirestore} from '@angular/fire/firestore';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PaymentIntent} from '@stripe/stripe-js';
import {RegistrationV2} from '../../models/registration-v2.model';

@Injectable()
export class PaymentService {

  constructor(
    private angularFirestore: AngularFirestore,
    private http: HttpClient) {
  }

  createPaymentIntent(paymentId: string): Observable<any> {
    return this.http.post<PaymentIntent>(
      environment.urlPaymentIntent,
      {paymentId: paymentId}
    );
  }

  getPayment(paymentId: string): Observable<Payment> {
    return this.angularFirestore
      .doc(`payments/${paymentId}`)
      .valueChanges() as Observable<Payment>;
  }

  save(payment: Payment): Promise<any> {
    return this.angularFirestore
      .collection('payments')
      .add(payment)
      .then((doc: DocumentReference) => {
        payment.id = doc.id;
      });
  };

  update(paymentId: string, data: Partial<Payment>): Promise<any> {
    return this.angularFirestore
      .doc(`payments/${paymentId}`)
      .update(data);
  }
}
