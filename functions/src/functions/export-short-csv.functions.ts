import {Parser} from 'json2csv';
import * as admin from 'firebase-admin';
import {RegistrationV2} from '../../../src/app/models/registration-v2.model';
import {ShortSize} from '../../../src/app/models/short-size.enum';
import {Session} from '../../../src/app/models/session';
import groupBy from 'lodash/groupBy';
import {Dictionary} from 'lodash';

export async function getExportEquipmentAsTxtFromSession(sessionId: string): Promise<any> {
  console.log(`getExportEquipmentAsCsvFromSession(${sessionId})`);

  const sessionQuerySnapshot: admin.firestore.DocumentSnapshot = await admin.firestore().doc(`sessions/${sessionId}`).get();
  const session: Session = sessionQuerySnapshot.data() as Session;

  console.log(JSON.stringify(session));

  const registrationsQuerySnapshot: admin.firestore.QuerySnapshot = await admin.firestore().collection(`registrations`).where('sessionId', '==', sessionId).get();
  const registrations: RegistrationV2[] = registrationsQuerySnapshot.docs.map(doc => doc.data() as RegistrationV2);

  console.log(JSON.stringify(registrations));

  const registrationsGroupedByShoeSize: Dictionary<RegistrationV2[]> = groupBy(registrations, r => r.trainee.shoeSize);
  console.log(JSON.stringify(registrationsGroupedByShoeSize));

  const shoeSizeSummary = [];
  for (const key in registrationsGroupedByShoeSize) {
    if (registrationsGroupedByShoeSize.hasOwnProperty(key)) {
      const value = registrationsGroupedByShoeSize[key];
      shoeSizeSummary.push(
        {
          'pointure': key,
          'quantité': value.length,
          'stagiaires': value.map(r => r.trainee.firstname + ' ' + r.trainee.lastname)
        }
      )
    }
  }
  console.log(JSON.stringify(shoeSizeSummary));

  const registrationsGroupedByShortSize: Dictionary<RegistrationV2[]> = groupBy(registrations, r => r.trainee.shortSize);
  console.log(JSON.stringify(registrationsGroupedByShortSize));

  const shortSizeSummary = [];
  for (const key in registrationsGroupedByShortSize) {
    if (registrationsGroupedByShortSize.hasOwnProperty(key)) {
      const value = registrationsGroupedByShortSize[key];
      shortSizeSummary.push(
        {
          'taille': key,
          'quantité': value.length,
          'stagiaires': value.map(r => r.trainee.firstname + ' ' + r.trainee.lastname)
        }
      )
    }
  }
  console.log(JSON.stringify(shortSizeSummary));

  return {
    'chaussettes': shoeSizeSummary,
    'maillots': shortSizeSummary
  };
}

export async function getExportEquipmentAsCsvFromCamp(campId: string): Promise<string> {
  console.log(`getExportEquipmentAsCsvFromCamp(${campId})`);

  const sessionsQuerySnapshot: admin.firestore.QuerySnapshot = await admin.firestore().collection(`sessions`).where('campId', '==', campId).get();
  const sessions: Session[] = sessionsQuerySnapshot.docs.map(doc => {
    const session = doc.data() as Session;
    session.id = doc.id;
    return session;
  });

  const shortExportAsJson = [];
  for (const session of sessions) {
    const shortExportAsJsonFromSession = await getEquipmentExportAsJsonFromSession(session.id);
    shortExportAsJson.push(shortExportAsJsonFromSession);
  }

  const fields = ['session', 'XXS', 'XS', 'S', 'M', 'L'];
  const opts = {fields};

  return new Parser(opts).parse(shortExportAsJson);
}

async function getEquipmentExportAsJsonFromSession(sessionId: string): Promise<any> {
  console.log(`getShortExportAsJsonFromSession(${sessionId})`);

  const sessionQuerySnapshot: admin.firestore.DocumentSnapshot = await admin.firestore().doc(`sessions/${sessionId}`).get();
  const session: Session = sessionQuerySnapshot.data() as Session;

  console.log(session);

  const registrationsQuerySnapshot: admin.firestore.QuerySnapshot = await admin.firestore().collection(`registrations`).where('sessionId', '==', sessionId).get();
  const registrations: RegistrationV2[] = registrationsQuerySnapshot.docs.map(doc => doc.data() as RegistrationV2);

  console.log(registrations);

  const shortExportAsJson = {
    session: session.start.toDate().toLocaleDateString('fr-FR') + ' à ' + session.end.toDate().toLocaleDateString('fr-FR'),
    XXS: registrations.filter(r => r.trainee.shortSize === ShortSize.XXS).length,
    XS: registrations.filter(r => r.trainee.shortSize === ShortSize.XS).length,
    S: registrations.filter(r => r.trainee.shortSize === ShortSize.S).length,
    M: registrations.filter(r => r.trainee.shortSize === ShortSize.M).length,
    L: registrations.filter(r => r.trainee.shortSize === ShortSize.L).length
  };

  console.log(shortExportAsJson);

  return shortExportAsJson;
}
