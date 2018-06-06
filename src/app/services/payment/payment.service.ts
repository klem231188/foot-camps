import {Injectable} from '@angular/core';
import {Payment} from '../../models/payment';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class PaymentService {

  // TODO inject from environment
  stripe = new Stripe('pk_test_BvSQqrD7gILIfBpT2i2x4505');

  constructor(private angularFirestore: AngularFirestore) {
  }

  save(payment: Payment): Promise<any> {
    return this.angularFirestore
      .collection('payments')
      .add(payment);
  }
}
