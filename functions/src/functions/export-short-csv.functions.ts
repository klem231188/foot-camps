import {Parser} from 'json2csv';
import * as admin from 'firebase-admin';
import {RegistrationV2} from '../../../src/app/models/registration-v2.model';
import {ShortSize} from '../../../src/app/models/short-size.enum';
import {Session} from '../../../src/app/models/session';


export async function getShortExportAsCsvFromCamp(campId: string): Promise<string> {
  console.log(`getShortExportAsCsvFromCamp(${campId})`);

  const sessionsQuerySnapshot: admin.firestore.QuerySnapshot = await admin.firestore().collection(`sessions`).where('campId', '==', campId).get();
  const sessions: Session[] = sessionsQuerySnapshot.docs.map(doc => {
    const session = doc.data() as Session;
    session.id = doc.id;
    return session;
  });

  const shortExportAsJson = [];
  for (const session of sessions) {
    const shortExportAsJsonFromSession = await getShortExportAsJsonFromSession(session.id);
    shortExportAsJson.push(shortExportAsJsonFromSession);
  }

  const fields = ['session', 'XXS', 'XS', 'S', 'M', 'L'];
  const opts = {fields};

  return new Parser(opts).parse(shortExportAsJson);
}

async function getShortExportAsJsonFromSession(sessionId: string): Promise<any> {
  console.log(`getShortExportAsJsonFromSession(${sessionId})`);

  const sessionQuerySnapshot: admin.firestore.DocumentSnapshot = await admin.firestore().doc(`sessions/${sessionId}`).get();
  const session: Session = sessionQuerySnapshot.data() as Session;

  console.log(session);

  const registrationsQuerySnapshot: admin.firestore.QuerySnapshot = await admin.firestore().collection(`registrations`).where('sessionId', '==', sessionId).get();
  const registrations: RegistrationV2[] = registrationsQuerySnapshot.docs.map(doc => doc.data() as RegistrationV2);

  console.log(registrations);

  const shortExportAsJson = {
    session: session.start.toDate().toLocaleDateString("fr-FR") + ' à ' + session.end.toDate().toLocaleDateString("fr-FR"),
    XXS: registrations.filter(r => r.trainee.shortSize === ShortSize.XXS).length,
    XS: registrations.filter(r => r.trainee.shortSize === ShortSize.XS).length,
    S: registrations.filter(r => r.trainee.shortSize === ShortSize.S).length,
    M: registrations.filter(r => r.trainee.shortSize === ShortSize.M).length,
    L: registrations.filter(r => r.trainee.shortSize === ShortSize.L).length
  };

  console.log(shortExportAsJson);

  return shortExportAsJson;
}
