import * as admin from 'firebase-admin';

export async function anonymize(request, response): Promise<void> {
  const db: admin.firestore.Firestore = admin.firestore();
  const querySnapshot: admin.firestore.QuerySnapshot = await db.collection('/registrations').get();
  for (const document of querySnapshot.docs) {
    document.ref.update({
      'trainee.email': 'clemtreguer@gmail.com'
    });
  }
}
