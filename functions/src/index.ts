import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {FootballCamp} from '../../src/app/models/football-camp';
import {Organizer} from '../../src/app/models/organizer';
import {Session} from '../../src/app/models/session';

admin.initializeApp(functions.config().firebase);

export const addCamps = functions.https.onRequest((request, response) => {
  const db = admin.firestore();
  const camps = db.collection('camps');

  const organizer1: Organizer = {
    firstname: 'Stéphane',
    lastname: 'LE HIR',
    manageRegistration: true,
    pathToPicture: './assets/img/bourg-blanc/organizers/avatar/Stephane-LE-HIR.jpg',
    phoneNumber: '0625253636',
    quote: 'Je suis très heureux de participer à cette 2<sup>ème</sup> édition.<br>Cette année on va redoubler d\'activités pour le bonheur du plus grand nombre d\'enfants'
  };

  const organizer2: Organizer = {
    firstname: 'Olivier',
    lastname: 'SENELLE',
    manageRegistration: true,
    pathToPicture: './assets/img/bourg-blanc/organizers/avatar/Olivier-SENELLE.jpg',
    phoneNumber: '0625253637',
    quote: 'N/A'
  };

  const organizer3: Organizer = {
    firstname: 'Ronan',
    lastname: 'ACH',
    manageRegistration: true,
    pathToPicture: './assets/img/bourg-blanc/organizers/avatar/Ronan-ACH.jpg',
    phoneNumber: '0625253638',
    quote: 'N/A'
  };

  const bourgBlancCamp: FootballCamp = {
    city: 'Abers Foot',
    latitude: 48.514941,
    longitude: -4.546849,
    details: {
      address: 'Stade AS Coat Méal',
      description: '<div>\n' +
      '            <p>\n' +
      '              <b>Le football :</b>\n' +
      '              Des séances de football seront programmées chaque jour pour les stagiaires. <br>\n' +
      '              Les équipes alterneront entre séances techniques, des tests, des oppositions. <br>\n' +
      '              Les structures de football varieront: terrain en herbe , futsal … pour le plus grand plaisir des\n' +
      '              enfants.\n' +
      '            </p>\n' +
      '\n' +
      '            <div>\n' +
      '              <b>Les animations :</b>\n' +
      '              En dehors du football, le projet met l’accent sur des animations:\n' +
      '              <ul>\n' +
      '                <li>Sortie au parc des 3 curés</li>\n' +
      '                <li>Sortie plage</li>\n' +
      '                <li>Une nuit en tente</li>\n' +
      '                <li>Chambara</li>\n' +
      '                <li>...</li>\n' +
      '              </ul>\n' +
      '              Ces animations permettront à chacun de s’exprimer en dehors du football, de prendre place dans un groupe\n' +
      '              et d’être soudé dans un esprit d’équipe.\n' +
      '            </div>\n' +
      '\n' +
      '            <p>\n' +
      '              <b>Les infrastructures :</b>\n' +
      '              Les repas du midi seront pris en majeure partie au Club-House de AS Coat-méal.\n' +
      '              L’accueil des enfants, le matin, se déroulera au complexe sportif également de\n' +
      '              AS Coat-méal ainsi que l’accueil des parents à partir de 16h30 .\n' +
      '            </p>\n' +
      '            <p>\n' +
      '              <b>Le coût du stage et prestations :</b>\n' +
      '              Une participation financière de 130 €<sup><b>(1)(2)</b></sup> est demandée à chaque stagiaire afin de\n' +
      '              couvrir les frais que ce soit des repas, les sorties, les frais d’encadrement des\n' +
      '              éducateurs, les équipements.\n' +
      '              <br>\n' +
      '              <sup><b>(1)</b></sup> Les chèques vacances et coupons sport sont acceptés\n' +
      '              <br>\n' +
      '              <sup><b>(2)</b></sup> Prix dégressifs si plusieurs frères et sœurs (105 €) à partir du 2<sup>ème</sup> enfant\n' +
      '            </p>\n' +
      '          </div>',
      gmapsUrl: 'https://goo.gl/maps/uBizS8vZwH32',
      location: 'Situé à l\'extrémité de la Bretagne, le stage se déroule à Coat-Méal dans le Finistère (29)',
      organizerDescription: 'Les stages sont encadrés par une une équipe technique de <b>qualité</b>, <b>expérimentée</b> et <b>motivée</b>',
      organizers: [organizer1, organizer2, organizer3],
      pathToGallery: './assets/img/bourg-blanc/gallery/data.json',
      pathToLogo: './assets/img/bourg-blanc/logo.png',
      pathToSchedule: './assets/img/bourg-blanc/programme.jpg',
      useOnlineRegistration: true,
      registrationUrl: null,
    },
    overview: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      pathToImage: './assets/img/bourg-blanc/overview.jpg',
      title: 'Bienvenue au Foot Camps de ABERS FOOT'
    }
  };

  camps.add(bourgBlancCamp);
  response.send('Camps added!\n\n');
});

export const addSessions = functions.https.onRequest((request, response) => {
  const db = admin.firestore();
  const sessions = db.collection('sessions');

  const session1: Session = {
    campId: '0u0kkOAwhLwmhtMKZI9t',
    currentNumberOfRegistrations: 0,
    enable: true,
    end: new Date('2018-07-13T12:00:00'),
    endRegistrationDate: new Date('2018-06-009T00:00:00'),
    fullBoardRates: null,
    halfBoardRates: 130,
    maximumNumberOfRegistrations: 30,
    start: new Date('2018-07-09T08:30:00')
  };

  // const session2: Session = {
  //   campId: 'AOo2tZ1h36kd7c5gRGIY',
  //   currentNumberOfRegistrations: 0,
  //   enable: true,
  //   end: new Date('2018-08-20T00:00:00'),
  //   fullBoardRates: null,
  //   halfBoardRates: 125,
  //   maximumNumberOfRegistrations: 15,
  //   start: new Date('2018-08-25T00:00:00')
  // };

  sessions.add(session1);

  // Workaround : https://stackoverflow.com/questions/46655344/firebase-cloud-function-with-firestore-returning-deadline-exceeded
  // setTimeout(() => {
  //   sessions.add(session2);
  // }, 2000);

  response.send('Sessions added!\n\n');
});

