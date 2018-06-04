import {Injectable} from '@angular/core';

@Injectable()
export class PaymentService {

  stripe = new Stripe('pk_test_BvSQqrD7gILIfBpT2i2x4505');

  constructor() { }
}
