import {Injectable} from '@angular/core';
import {Payment} from '../../models/payment';
import {AngularFirestore} from '@angular/fire/firestore';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class PaymentService {

  stripe = new Stripe(environment.stripe.publicKey);

  constructor(
    private angularFirestore: AngularFirestore,
    private http: HttpClient) {
  }

  save(payment: Payment): Promise<any> {
    return this.angularFirestore
      .collection('payments')
      .add(payment)
      .then((doc: DocumentReference) => {
        payment.id = doc.id;
        return;
      });
  };

  getPayment(paymentId: string): Observable<Payment> {
    return this.angularFirestore
      .doc(`payments/${paymentId}`)
      .valueChanges() as Observable<Payment>;
  }

  makePaymentByCard(payment: Payment): Observable<any> {
    const url = environment.urlMakePaymentByCard;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post<any>(url, payment, {headers});
  };
}
