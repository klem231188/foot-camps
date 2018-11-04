import {Injectable} from '@angular/core';
import {Payment} from '../../models/payment';
import {AngularFirestore} from '@angular/fire/firestore';
import {DocumentReference} from '@angular/fire/firestore/interfaces';

@Injectable()
export class PaymentService {

  // TODO inject from environment
  stripe = new Stripe('pk_test_BvSQqrD7gILIfBpT2i2x4505');

  constructor(private angularFirestore: AngularFirestore) {
  }

  save(payment: Payment): Promise<DocumentReference> {
    return this.angularFirestore
      .collection('payments')
      .add(payment);
  }
}
