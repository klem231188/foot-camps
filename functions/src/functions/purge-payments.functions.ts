import * as admin from 'firebase-admin';
import {RegistrationV2} from '../../../src/app/models/registration-v2.model';

export async function purgePayments() {
  const db = admin.firestore();

  // Get payments linked to registrations
  const registrationsSnapshot = await db.collection('/registrations').get();
  const paymentIdsToKeep: string[] = registrationsSnapshot
    .docs
    .map(registrationSnapshot => (registrationSnapshot.data() as RegistrationV2).paymentId);

  // Get all payments
  const paymentsSnapshot = await db.collection('/payments').get();
  const allPaymentIds: string[] = paymentsSnapshot
    .docs
    .map(paymentSnapshot => paymentSnapshot.id);

  // Filter to keep payments not linked to any registration
  const paymentIdsToPurge: string[] = allPaymentIds.filter(paymentId => !paymentIdsToKeep.includes(paymentId));

  // Log
  console.log('paymentIdsToKeep');
  console.log(paymentIdsToKeep);
  console.log('allPaymentIds');
  console.log(allPaymentIds);
  console.log('paymentIdsToPurge');
  console.log(paymentIdsToPurge);

  // Purge
  for (const paymentIdToPurge of paymentIdsToPurge) {
    await db.collection('/payments').doc(paymentIdToPurge).delete()
  }
}
