import * as admin from 'firebase-admin';

export async function purgeRegistrations() {
  const db = admin.firestore();

  // Get all session ids
  const sessionsSnapshot = await db.collection('/sessions').get();
  const sessionsIds = sessionsSnapshot.docs.map(sessionSnapshot => sessionSnapshot.id);

  // Get sessions linked to registrations
  const registrationsSnapshot = await db.collection('/registrations').where('sessionId', 'not-in', sessionsIds).get();
  const registrationIdsToPurge = registrationsSnapshot.docs.map(registrationSnapshot => registrationSnapshot.id);

  // Log
  console.log('registrationIdsToPurge');
  console.log(registrationIdsToPurge);

  // Purge
  for (const registrationIdToPurge of registrationIdsToPurge) {
    await db.collection('/registrations').doc(registrationIdToPurge).delete()
  }
}
