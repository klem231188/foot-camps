import * as admin from 'firebase-admin';
import PlouguerneauCamp from './json/plouguerneau-camp.json';
import PlouguerneauSessions from './json/plouguerneau-sessions.json';
import AberCamp from './json/aber-camp.json';
import AberSessions from './json/aber-sessions.json';
import PlabennecCamp from './json/plabennec-camp.json';
import PlabennecSessions from './json/plabennec-sessions.json';
import {FootballCamp} from '../../../src/app/models/football-camp';
import {Session} from '../../../src/app/models/session';
import {RegistrationV2} from '../../../src/app/models/registration-v2.model';
import {RegistrationState} from '../../../src/app/models/registration-state.enum';

async function setCamp(
  camp: FootballCamp,
  sessions: Session[]
) {
// Create camp
  await admin.firestore().collection('camps').doc(camp.id).set(camp);

  // Create sessions
  for (const session of sessions) {
    console.log(`Create or Update session ${session.id}`);
    session.end = admin.firestore.Timestamp.fromDate(new Date(session.end));
    session.endRegistrationDate = admin.firestore.Timestamp.fromDate(new Date(session.endRegistrationDate));
    session.start = admin.firestore.Timestamp.fromDate(new Date(session.start));
    await admin.firestore().collection('sessions').doc(session.id).set(session);

    console.log(`Update session numberOfRegistrations`);
    const registrationsSnap = await admin.firestore().collection('registrations').where('sessionId', '==', session.id).get();
    console.log(`${registrationsSnap.docs.length} registration documents found`);
    const numberOfRegistrationsAccepted = registrationsSnap.docs.filter(registrationSnap => (registrationSnap.data() as RegistrationV2).state === RegistrationState.ACCEPTED).length;
    const numberOfRegistrationsRejected = registrationsSnap.docs.filter(registrationSnap => (registrationSnap.data() as RegistrationV2).state === RegistrationState.REJECTED).length;
    const numberOfRegistrationsInProgress = registrationsSnap.docs.filter(registrationSnap => (registrationSnap.data() as RegistrationV2).state === RegistrationState.IN_PROGRESS).length;

    const partialSessionUpdate: Partial<Session> = {
      numberOfRegistrationsAccepted: numberOfRegistrationsAccepted,
      numberOfRegistrationsInProgress: numberOfRegistrationsInProgress,
      numberOfRegistrationsRejected: numberOfRegistrationsRejected
    }

    await admin.firestore().collection('sessions').doc(session.id).set(partialSessionUpdate, {merge: true});
  }
}

export async function setCampPlouguerneau() {
  const camp: FootballCamp = PlouguerneauCamp as FootballCamp;
  const sessions: Session[] = PlouguerneauSessions as Session[];
  await setCamp(camp, sessions);
}

export async function setCampPlabennec() {
  const camp: FootballCamp = PlabennecCamp as FootballCamp;
  const sessions: Session[] = PlabennecSessions as Session[];
  await setCamp(camp, sessions);
}

export async function setCampAber() {
  const camp: FootballCamp = AberCamp as FootballCamp;
  const sessions: Session[] = AberSessions as Session[];
  await setCamp(camp, sessions);
}
