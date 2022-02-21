import {Injectable} from '@angular/core';
import {Payment} from '../../models/payment';
import {Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot} from '@angular/fire/firestore';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PaymentIntent} from '@stripe/stripe-js';
import {map, publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private payments$: Observable<Payment[]> = null;

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
      .doc<Payment>(`payments/${paymentId}`)
      .valueChanges({ idField: 'id' })
  }

  getPayments(): Observable<Payment[]> {
    console.log('getPayments()');

    if (this.payments$ == null) {
      this.payments$ = this.angularFirestore
        .collection<Payment>('payments')
        .valueChanges({ idField: 'id' })
        .pipe(
          publishReplay(1), // Latest event is buffered and will be emit to new subscriber
          refCount() // Transform ConnectableObservable to Observable and handle multiple subscription / unsubscription
        )
    }

    return this.payments$;
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
