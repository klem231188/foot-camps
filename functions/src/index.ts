/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {FootballCamp} from '../../src/app/models/football-camp';

// Create and Deploy Cloud Function with TypeScript using script that is
// defined in functions/package.json:
//    cd functions
//    npm run deploy
admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
  const db = admin.firestore();
  const camps = db.collection('camps');

  const bourgBlancCamp: FootballCamp = new FootballCamp();
  bourgBlancCamp.city = 'Bourg-Blanc';
  bourgBlancCamp.latitude = 48.4926696;
  bourgBlancCamp.longitude = -4.508196;

  const result = {};
  Object.keys(bourgBlancCamp).map(key => result[key] = bourgBlancCamp[key]);

  camps.add(result);
  response.send('Hello from Firebase!\n\n');
});

