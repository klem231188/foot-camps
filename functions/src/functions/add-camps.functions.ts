import * as admin from 'firebase-admin';
import * as AberCamp from './json/aber-camp.json'
import * as AberSessions from './json/aber-sessions.json'
import * as PlouguerneauCamp from './json/plouguerneau-camp.json'
import * as PlouguerneauSessions from './json/plouguerneau-sessions.json'
import {FootballCamp} from '../../../src/app/models/football-camp';
import {Session} from '../../../src/app/models/session';

export function addCampAberFoot(request, response): Promise<void> {
  // @ts-ignore
  const camp: FootballCamp = AberCamp as FootballCamp;
  const sessions: Session[] = (AberSessions as Session[]);
  for (const session of sessions) {
    session.end = admin.firestore.Timestamp.fromDate(new Date(session.end));
    session.endRegistrationDate = admin.firestore.Timestamp.fromDate(new Date(session.endRegistrationDate));
    session.start = admin.firestore.Timestamp.fromDate(new Date(session.start));
  }

  return addCamp(request, response, camp, sessions);
}

export function addCampPlouguerneau(request, response): Promise<void> {
  // @ts-ignore
  const camp: FootballCamp = PlouguerneauCamp as FootballCamp;
  const sessions: Session[] = (PlouguerneauSessions as Session[]);
  for (const session of sessions) {
    session.end = admin.firestore.Timestamp.fromDate(new Date(session.end));
    session.endRegistrationDate = admin.firestore.Timestamp.fromDate(new Date(session.endRegistrationDate));
    session.start = admin.firestore.Timestamp.fromDate(new Date(session.start));
  }

  return addCamp(request, response, camp, sessions);
}

function addCamp(request, response, camp: FootballCamp, sessions: Session[]): Promise<void> {
  const db = admin.firestore();

  return db.collection('camps')
    .add(camp)
    .then((snap) => {
      console.log('Camp added with ID: ', snap.id);
      const sessionsColRef = db.collection('sessions');

      // Begin a new batch
      const batch = db.batch();

      // Set each document, as part of the batch
      sessions.forEach(session => {
        session.campId = snap.id;
        const sessionDocRef = sessionsColRef.doc();
        batch.set(sessionDocRef, session);
      });

      // Commit the entire batch
      return batch
        .commit()
        .then(function () {
          console.log('Sessions added successfully');
          response.send('Camp and sessions added successfully\n\n');
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
          response.send('An error occured adding session\n\n');
        });
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
      response.send('An error occured adding camp\n\n');
    });
}
