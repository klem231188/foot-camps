import Stripe from 'stripe';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Payment} from '../../../src/app/models/payment';
import {Session} from '../../../src/app/models/session';
import {RegistrationV2} from '../../../src/app/models/registration-v2.model';
import {FootballCamp} from '../../../src/app/models/football-camp';

const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2020-08-27',
});

export async function createPaymentIntent(
  paymentId: string
) {
  // Get payment
  const paymentSnapshot = await admin.firestore().collection('payments').doc(paymentId).get();
  const payment = (paymentSnapshot.data() as Payment)

  // Get registration
  const registrationSnapshot = await admin.firestore().collection('registrations').doc(payment.registrationId).get();
  const registration = (registrationSnapshot.data() as RegistrationV2)

  // Get session
  const sessionSnaphost = await admin.firestore().collection('sessions').doc(registration.sessionId).get();
  const session = (sessionSnaphost.data() as Session)

  // Get camp
  const footballCampSnaphost = await admin.firestore().collection('camps').doc(session.campId).get();
  const footballCamp = (footballCampSnaphost.data() as FootballCamp)

  let price = null;
  if (payment.reducedPrice && payment.halfBoard) {
    price = footballCamp.paymentInfo.prices.halfBoardReducedPrice;
  }
  else if (payment.reducedPrice && !payment.halfBoard) {
    price = footballCamp.paymentInfo.prices.fullBoardReducedPrice;
  }
  else if (!payment.reducedPrice && payment.halfBoard) {
    price = footballCamp.paymentInfo.prices.halfBoardPrice;
  }
  else if (!payment.reducedPrice && !payment.halfBoard) {
    price = footballCamp.paymentInfo.prices.fullBoardPrice;
  }

  if (price !== null) {
    // Price must be configured in cents
    price = price * 100;

    if (price > 50000) {
      throw new Error('Price can\'t be greater than 50000');
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'EUR',
      application_fee_amount: footballCamp.paymentInfo.feeAmount * 100,
      transfer_data: {
        destination: footballCamp.paymentInfo.accountId,
      }
    });

    // Return PaymentIntent
    return {
      publishableKey: functions.config().stripe.public_key,
      clientSecret: paymentIntent.client_secret
    }
  } else {
    throw new Error('Can\'t find associated price');
  }
}
