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
import {Details} from '../../src/app/models/details';
import {Organizer} from '../../src/app/models/organizer';
import {Overview} from '../../src/app/models/overview';

admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
  const db = admin.firestore();
  const camps = db.collection('camps');

  const organizer1: Organizer = {
    firstname: 'Stéphane',
    lastname: 'LE HIR',
    manageRegistration: true,
    pathToPicture: './assets/img/bourg-blanc/organizers/avatar/Stephane-LE-HIR.jpg',
    phoneNumber: '0666358552'
  };

  const organizer2: Organizer = {
    firstname: 'Germain',
    lastname: 'BIANNIC',
    manageRegistration: true,
    pathToPicture: './assets/img/bourg-blanc/organizers/avatar/Germain-BIANNIC.jpg',
    phoneNumber: '0625253636'
  };

  const bourgBlancCamp: FootballCamp = {
    city: 'Bourg-Blanc',
    latitude: 48.4926696,
    longitude: -4.508196,
    details: {
      address: 'Stade Touroussel, 29860 Bourg-Blanc',
      description: '\'<p>       Ce stage s\\\'adresse à la fois à ceux voulant s\\\'initier au football, ainsi qu\\\'à ceux voulant se perfectionner.       <ul>        <li>Des <b>ateliers découvertes</b> sont proposés pour les plus jeunes et les non pratiquants souhaitant s\\\'initier</li>        <li>Des <b>ateliers techniques</b> pour les plus expérimenté(e)s</li>        <li>Des <b>ateliers spécifiques gardiens de but</b></li>       </ul>       L\\\'ensemble des ateliers se déroulent sous différents formats (jeux, défis, ...)     </p>      <p>       Ce stage propose aux enfants d\\\'autres activités extra-sportives :       <ul>        <li>Soccer de Guipavas, pour un tournoi disputé et inoubliable</li>        <li>La Récré des curés, pour quitter les terrains, se détendre et s’amuser dans le parc de loisir de Milizac</li>        <li>Un Laser Game, pour une bataille virtuelle entre l’équipe des Rouges et celle des Bleus</li>       </ul>     </p>      <b>Infrastructures sportives:</b> <ul><li>A faire</li></ul>     <b>Infrastructures générales:</b> <ul><li>A faire</li></ul>\'',
      gmapsUrl: 'https://goo.gl/maps/ZVkCSWFT4fs',
      location: 'Situé à l\'extrémité de la Bretagne, le stage se déroule à Bourg-Blanc dans le Finistère (29).',
      organizerDescription: 'Les stages sont encadrés par une une équipe technique de <b>qualité</b>, <b>expérimentée</b> et <b>motivée</b> <br>     TODO',
      organizers: [organizer1, organizer2],
      pathToGallery: './assets/img/bourg-blanc/gallery/data.json',
      pathToLogo: './assets/img/bourg-blanc/logo.png',
      pathToSchedule: './assets/img/bourg-blanc/programme.jpg',
      useOnlineRegistration: true,
      registrationUrl: null,
    },
    overview: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      pathToImage: './assets/img/bourg-blanc/overview.jpg',
      title: 'Bienvenue au Foot Camps de Bourg-Blanc'
    }
  };


  // const result = {};
  // Object.keys(bourgBlancCamp).map(key => result[key] = bourgBlancCamp[key]);

  camps.add(bourgBlancCamp);
  response.send('Hello from Firebase!\n\n');
});

