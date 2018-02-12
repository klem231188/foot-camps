import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {FootballCamp} from '../../../src/app/models/football-camp';

export const listener = functions.https.onRequest((req, res) => {
  admin.initializeApp(functions.config().firebase);
  var db = admin.firestore();
  var camps = db.collection('camps');

  let bourgBlancCamp: FootballCamp = new FootballCamp();
  bourgBlancCamp.city = 'Bourg-Blanc';
  bourgBlancCamp.latitude = 48.4926696;
  bourgBlancCamp.longitude = -4.508196;

  camps.add(bourgBlancCamp);
});
