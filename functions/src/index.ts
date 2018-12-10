import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Stripe from 'stripe';
import {Change, EventContext} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Payment} from '../../src/app/models/payment';
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
});

admin.initializeApp();

// export const addAberCamp = functions.https.onRequest((request, response) => {
//   const organizer1: Organizer = {
//     firstname: 'Stéphane',
//     lastname: 'LE HIR',
//     manageRegistration: true,
//     pathToPicture: './assets/img/aber/organizers/avatar/Stephane-LE-HIR.jpg',
//     phoneNumber: '0675839337',
//     quote: 'Je suis très heureux de participer à cette 4<sup>ème</sup> édition.<br>Cette année on va redoubler d\'activités pour le bonheur du plus grand nombre d\'enfants'
//   };
//
//   const organizer2: Organizer = {
//     firstname: 'Olivier',
//     lastname: 'SENELLE',
//     manageRegistration: true,
//     pathToPicture: './assets/img/aber/organizers/avatar/Olivier-SENELLE.jpg',
//     phoneNumber: '0660891235',
//     quote: 'N/A'
//   };
//
//   const organizer3: Organizer = {
//     firstname: 'Ronan',
//     lastname: 'ACH',
//     manageRegistration: true,
//     pathToPicture: './assets/img/aber/organizers/avatar/Ronan-ACH.jpg',
//     phoneNumber: '0662995150',
//     quote: 'N/A'
//   };
//
//   const camp: FootballCamp = {
//     city: 'Abers Foot',
//     latitude: 48.514941,
//     longitude: -4.546849,
//     details: {
//       address: 'Stade AS Coat Méal',
//       description: '<div>\n' +
//       '            <p>\n' +
//       '              <b>Le football :</b>\n' +
//       '              Des séances de football seront programmées chaque jour pour les stagiaires. <br>\n' +
//       '              Les équipes alterneront entre séances techniques, des tests, des oppositions. <br>\n' +
//       '              Les structures de football varieront: terrain en herbe , futsal … pour le plus grand plaisir des\n' +
//       '              enfants.\n' +
//       '            </p>\n' +
//       '\n' +
//       '            <div>\n' +
//       '              <b>Les animations :</b>\n' +
//       '              En dehors du football, le projet met l’accent sur des animations:\n' +
//       '              <ul>\n' +
//       '                <li>Sortie au parc des 3 curés</li>\n' +
//       '                <li>Sortie plage</li>\n' +
//       '                <li>Une nuit en tente</li>\n' +
//       '                <li>Chambara</li>\n' +
//       '                <li>...</li>\n' +
//       '              </ul>\n' +
//       '              Ces animations permettront à chacun de s’exprimer en dehors du football, de prendre place dans un groupe\n' +
//       '              et d’être soudé dans un esprit d’équipe.\n' +
//       '            </div>\n' +
//       '\n' +
//       '            <p>\n' +
//       '              <b>Les infrastructures :</b>\n' +
//       '              Les repas du midi seront pris en majeure partie au Club-House de AS Coat-méal.\n' +
//       '              L’accueil des enfants, le matin, se déroulera au complexe sportif également de\n' +
//       '              AS Coat-méal ainsi que l’accueil des parents à partir de 16h30 .\n' +
//       '            </p>\n' +
//       '            <p>\n' +
//       '              <b>Le coût du stage et prestations :</b>\n' +
//       '              Une participation financière de 130 €<sup><b>(1)(2)</b></sup> est demandée à chaque stagiaire afin de\n' +
//       '              couvrir les frais que ce soit des repas, les sorties, les frais d’encadrement des\n' +
//       '              éducateurs, les équipements.\n' +
//       '              <br>\n' +
//       '              <sup><b>(1)</b></sup> Les chèques vacances et coupons sport sont acceptés\n' +
//       '              <br>\n' +
//       '              <sup><b>(2)</b></sup> Prix dégressifs si plusieurs frères et sœurs (105 €) à partir du 2<sup>ème</sup> enfant\n' +
//       '            </p>\n' +
//       '          </div>',
//       gmapsUrl: 'https://goo.gl/maps/uBizS8vZwH32',
//       location: 'Situé à l\'extrémité de la Bretagne, le stage se déroule à Coat-Méal dans le Finistère (29)',
//       organizerDescription: 'Les stages sont encadrés par une une équipe technique de <b>qualité</b>, <b>expérimentée</b> et <b>motivée</b>',
//       organizers: [organizer1, organizer2, organizer3],
//       pathToGallery: './assets/img/aber/gallery/data.json',
//       pathToLogo: './assets/img/aber/logo.png',
//       pathToSchedule: './assets/img/aber/programme.jpg',
//       useOnlineRegistration: true,
//       registrationUrl: null,
//     },
//     overview: {
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       pathToImage: './assets/img/aber/overview.jpg',
//       title: 'Bienvenue au Foot Camps de ABERS FOOT'
//     }
//   };
//
//   const session: Session = {
//     campId: '',
//     numberOfRegistrationsAccepted: 0,
//     numberOfRegistrationsInProgress: 0,
//     numberOfRegistrationsRejected: 0,
//     enable: true,
//     end: firebase.firestore.Timestamp.fromDate(new Date('2018-07-13T12:00:00')),
//     endRegistrationDate: firebase.firestore.Timestamp.fromDate(new Date('2018-06-09T00:00:00')),
//     fullBoardRates: null,
//     halfBoardRates: 130,
//     maximumNumberOfRegistrations: 40,
//     start: firebase.firestore.Timestamp.fromDate(new Date('2018-07-09T08:30:00'))
//   };
//
//   // const session2: Session = {
//   //   campId: '',
//   //   numberOfRegistrationsAccepted: 0,
//   //   numberOfRegistrationsInProgress: 0,
//   //   numberOfRegistrationsRejected: 0,
//   //   enable: true,
//   //   end: new Date('2018-07-24T12:00:00'),
//   //   endRegistrationDate: new Date('2018-06-09T00:00:00'),
//   //   fullBoardRates: null,
//   //   halfBoardRates: 130,
//   //   maximumNumberOfRegistrations: 30,
//   //   start: new Date('2018-07-20T08:30:00')
//   // };
//
//   addCamp(request, response, camp, [session]);
// });
//
// export const addPlabennecCamp = functions.https.onRequest((request, response) => {
//   const organizer1: Organizer = {
//     firstname: 'Steven',
//     lastname: 'COAT',
//     manageRegistration: true,
//     pathToPicture: './assets/img/plabennec/organizers/avatar/Steven-COAT.jpg',
//     phoneNumber: '0625253636',
//     quote: 'Je suis très heureux de participer à cette 2<sup>ème</sup> édition.<br>Cette année on va redoubler d\'activités pour le bonheur du plus grand nombre d\'enfants'
//   };
//
//   const organizer2: Organizer = {
//     firstname: 'Florian',
//     lastname: 'GUILLOU',
//     manageRegistration: true,
//     pathToPicture: './assets/img/plabennec/organizers/avatar/Florian-GUILLOU.jpg',
//     phoneNumber: '0625253637',
//     quote: 'N/A'
//   };
//
//   const organizer3: Organizer = {
//     firstname: 'Matthieu',
//     lastname: 'TANGUY',
//     manageRegistration: true,
//     pathToPicture: './assets/img/plabennec/organizers/avatar/Matthieu-TANGUY.jpg',
//     phoneNumber: '0625253638',
//     quote: 'N/A'
//   };
//
//   const camp: FootballCamp = {
//     city: 'Plabennec Stage d\'été',
//     latitude: 48.4999551,
//     longitude: -4.4484149,
//     details: {
//       address: 'Stade Plabennecois Football, Complexe de Kerveguen, 29860 Plabennec',
//       description: '<p>\n' +
//       '      Ce stage s\'adresse à la fois à ceux voulant s\'initier au football, ainsi qu\'à ceux voulant se perfectionner.\n' +
//       '      <ul>\n' +
//       '       <li>Des <b>ateliers découvertes</b> sont proposés pour les plus jeunes et les non pratiquants souhaitant s\'initier</li>\n' +
//       '       <li>Des <b>ateliers techniques</b> pour les plus expérimenté(e)s</li>\n' +
//       '       <li>Des <b>ateliers spécifiques gardiens de but</b></li>\n' +
//       '      </ul>\n' +
//       '      L\'ensemble des ateliers se déroulent sous différents formats (jeux, défis, ...)\n' +
//       '    </p>\n' +
//       '\n' +
//       '    <p>\n' +
//       '      Ce stage propose aux enfants d\'autres activités extra-sportives :\n' +
//       '      <ul>\n' +
//       '       <li>Soccer de Guipavas, pour un tournoi disputé et inoubliable</li>\n' +
//       '       <li>La Récré des curés, pour quitter les terrains, se détendre et s’amuser dans le parc de loisir de Milizac</li>\n' +
//       '       <li>Un Laser Game, pour une bataille virtuelle entre l’équipe des Rouges et celle des Bleus</li>\n' +
//       '      </ul>\n' +
//       '    </p>\n' +
//       '\n' +
//       '    <b>Infrastructures sportives:</b> <ul><li>A faire</li></ul>\n' +
//       '    <b>Infrastructures générales:</b> <ul><li>A faire</li></ul>',
//       gmapsUrl: 'https://goo.gl/maps/5GMh35CKxnv',
//       location: 'Situé à l\'extrémité de la Bretagne, le stage se déroule à Plabennec dans le Finistère (29).',
//       organizerDescription: '    Les stages sont encadrés par une une équipe technique de <b>qualité</b>, <b>expérimentée</b> et <b>motivée</b> <br>\n' +
//       '    Cinq joueurs du Stade Plabennecois, sont présents pour encadrer et proposer un programme de qualité.<br>\n' +
//       '    Depuis 4 ans ce stage connait un succès grandissant.',
//       organizers: [organizer1, organizer2, organizer3],
//       pathToGallery: './assets/img/plabennec/gallery/data.json',
//       pathToLogo: './assets/img/plabennec/logo.png',
//       pathToSchedule: './assets/img/plabennec/programme.jpg',
//       useOnlineRegistration: false,
//       registrationUrl: 'http://www.plab29.com/plabete',
//     },
//     overview: {
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       pathToImage: './assets/img/plabennec/overview.jpg',
//       title: 'Bienvenue au Foot Camps de Plabennec'
//     }
//   };
//
//   const session1: Session = {
//     campId: '',
//     numberOfRegistrationsAccepted: 0,
//     numberOfRegistrationsInProgress: 0,
//     numberOfRegistrationsRejected: 0,
//     enable: true,
//     end: firebase.firestore.Timestamp.fromDate(new Date('2018-07-10T12:00:00')),
//     endRegistrationDate: firebase.firestore.Timestamp.fromDate(new Date('2018-06-09T00:00:00')),
//     fullBoardRates: null,
//     halfBoardRates: 230,
//     maximumNumberOfRegistrations: 30,
//     start: firebase.firestore.Timestamp.fromDate(new Date('2018-07-14T08:30:00'))
//   };
//
//   const session2: Session = {
//     campId: '',
//     numberOfRegistrationsAccepted: 0,
//     numberOfRegistrationsInProgress: 0,
//     numberOfRegistrationsRejected: 0,
//     enable: true,
//     end: firebase.firestore.Timestamp.fromDate(new Date('2018-07-17T12:00:00')),
//     endRegistrationDate: firebase.firestore.Timestamp.fromDate(new Date('2018-06-09T00:00:00')),
//     fullBoardRates: null,
//     halfBoardRates: 230,
//     maximumNumberOfRegistrations: 30,
//     start: firebase.firestore.Timestamp.fromDate(new Date('2018-07-21T08:30:00'))
//   };
//
//   const session3: Session = {
//     campId: '',
//     numberOfRegistrationsAccepted: 0,
//     numberOfRegistrationsInProgress: 0,
//     numberOfRegistrationsRejected: 0,
//     enable: true,
//     end: firebase.firestore.Timestamp.fromDate(new Date('2018-07-24T12:00:00')),
//     endRegistrationDate: firebase.firestore.Timestamp.fromDate(new Date('2018-06-09T00:00:00')),
//     fullBoardRates: null,
//     halfBoardRates: 230,
//     maximumNumberOfRegistrations: 30,
//     start: firebase.firestore.Timestamp.fromDate(new Date('2018-07-28T08:30:00'))
//   };
//
//   addCamp(request, response, camp, [session1, session2, session3]);
// });
//
// function addCamp(request, response, camp: FootballCamp, sessions: Session[]): void {
//   const db = admin.firestore();
//   db.collection('camps')
//     .add(camp)
//     .then(function (campAdded) {
//       console.log('Camp added with ID: ', campAdded.id);
//
//       const sessionsColRef = db.collection('sessions');
//
//       // Begin a new batch
//       const batch = db.batch();
//
//       // Set each document, as part of the batch
//       sessions.forEach(session => {
//         session.campId = campAdded.id;
//         const sessionDocRef = sessionsColRef.doc();
//         batch.set(sessionDocRef, session);
//       })
//
//       // Commit the entire batch
//       batch
//         .commit()
//         .then(function () {
//           console.log('Sessions added successfully');
//           response.send('Camp and sessions added successfully\n\n');
//         })
//         .catch(function (error) {
//           console.error('Error adding document: ', error);
//           response.send('An error occured adding session\n\n');
//         });
//     })
//     .catch(function (error) {
//       console.error('Error adding document: ', error);
//       response.send('An error occured adding camp\n\n');
//     });
// }
//
// export const sendEmailOnCreateRegistration = functions.firestore
//   .document('registrations/{rid}')
//   .onCreate(event => {
//     console.log(event);
//     const registration: Registration = event.data.data();
//     return updateNumberOfRegistrations(null, registration)
//       .then(() => {
//         return sendMail(registration);
//       });
//   });
//
// export const sendEmailOnUpdateRegistrationState = functions.firestore
//   .document('registrations/{rid}')
//   .onUpdate(event => {
//     console.log(event);
//     const newRegistration: Registration = event.data.data();
//     const previousRegistration: Registration = event.data.previous.data();
//
//     if (newRegistration.state !== previousRegistration.state) {
//       return updateNumberOfRegistrations(previousRegistration, newRegistration)
//         .then(() => {
//           return sendMail(newRegistration);
//         });
//     } else {
//       console.log('RegistrationState has not changed');
//       return null;
//     }
//   });
//
// function updateNumberOfRegistrations(previousRegistration: Registration,
//                                      newRegistration: Registration) {
//   console.log(`updateNumberOfRegistrations(${JSON.stringify(previousRegistration)}, ${JSON.stringify(newRegistration)})`);
//
//   // TODO : assign a return type Promise<WriteResult> (error on import)
//   return admin.firestore()
//     .doc(`sessions/${newRegistration.sessionId}`)
//     .get()
//     .then((snapshot) => {
//       // TODO : assign a return type Promise<WriteResult> (error on import)
//       const session = snapshot.data();
//       const patch = {};
//
//       if (previousRegistration && previousRegistration.state) {
//         switch (previousRegistration.state) {
//           case 'ACCEPTED': {
//             patch['numberOfRegistrationsAccepted'] = session.numberOfRegistrationsAccepted - 1;
//             break;
//           }
//           case 'IN_PROGRESS': {
//             patch['numberOfRegistrationsInProgress'] = session.numberOfRegistrationsInProgress - 1;
//             break;
//           }
//           case 'REJECTED': {
//             patch['numberOfRegistrationsRejected'] = session.numberOfRegistrationsRejected - 1;
//             break;
//           }
//         }
//       }
//
//       if (newRegistration && newRegistration.state) {
//         switch (newRegistration.state) {
//           case 'ACCEPTED': {
//             patch['numberOfRegistrationsAccepted'] = session.numberOfRegistrationsAccepted + 1;
//             break;
//           }
//           case 'IN_PROGRESS': {
//             patch['numberOfRegistrationsInProgress'] = session.numberOfRegistrationsInProgress + 1;
//             break;
//           }
//           case 'REJECTED': {
//             patch['numberOfRegistrationsRejected'] = session.numberOfRegistrationsRejected + 1;
//             break;
//           }
//         }
//       }
//
//       console.log(`patch : ${patch}`);
//       console.log(patch);
//
//       return admin.firestore()
//         .doc(`sessions/${newRegistration.sessionId}`)
//         .update(patch)
//     });
// }
//
// function sendMail(registration: Registration) {
//   // Configure the email transport using the default SMTP transport and a GMail account.
//   // For other types of transports such as Sendgrid see https://nodemailer.com/transports/
//   // TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
//   console.log(`sendMail(${JSON.stringify(registration)})`);
//
//   const gmailEmail = functions.config().gmail.email;
//   const gmailPassword = functions.config().gmail.password;
//   const mailTransport: Transporter = createTransport({
//     service: 'gmail',
//     auth: {
//       user: gmailEmail,
//       pass: gmailPassword
//     }
//   });
//
//   const mailOptions: SendMailOptions = {
//     from: '"Footcamps" <noreply@firebase.com>',
//     to: registration.email
//   };
//
//   // Building Email message.
//   if (registration.state === 'IN_PROGRESS') {
//     // TODO RegistrationState.IN_PROGRESS
//     mailOptions.subject = 'Inscription à AbersFoot en cours';
//     mailOptions.html = `Bonjour ${registration.firstname} ${registration.lastname},<br> Votre inscription au stage de football AbersFoot a bien été prise en compte.<br> Pour la valider, il faut <b>payer la somme de 130€ à Stéphane le HIR </b> par chèque ou chèque vacance avant le 09 Juin 2018.`;
//   } else if (registration.state === 'ACCEPTED') {
//     // TODO RegistrationState.ACCEPTED
//     mailOptions.subject = 'Inscription à AbersFoot validée';
//     mailOptions.html = `Bonjour ${registration.firstname} ${registration.lastname},<br> Félicitations, votre inscription au stage de football AbersFoot a été validée.<br> Bon stage !`;
//   } else if (registration.state === 'REJECTED') {
//     mailOptions.subject = 'Inscription à AbersFoot rejetée';
//     mailOptions.html = `Bonjour ${registration.firstname} ${registration.lastname},<br> Hélas votre inscription au stage de football AbersFoot a été rejetée!`;
//   }
//
//   return mailTransport
//     .sendMail(mailOptions)
//     .then((info) => console.log(`A mail has been sent to ${registration.email} with state ${registration.state}`))
//     .catch((error) => console.error('There was an error while sending the email:', error));
// }

// export const onCreatePayment = functions.firestore
//   .document('payments/{paymentId}')
//   .onCreate((snap, context) => {
//     console.log('onCreatePayment()');
//
//     const paymentInProgress = snap.data();
//     console.log('paymentInProgress:', paymentInProgress);
//
//     const paymentId: string = context.params.paymentId;
//     console.log('paymentId:', paymentId);
//
//     const registrationId: string = paymentInProgress.registrationId;
//     console.log('registrationId:', registrationId);
//
//     return admin.firestore()
//       .doc(`registrations/${registrationId}`)
//       .get()
//       .then((docRegistration: admin.firestore.DocumentData) => {
//         const registration = docRegistration.data();
//         console.log(`Retrieving registration: ${JSON.stringify(registration)}`);
//
//         return admin.firestore()
//           .doc(`sessions/${registration.sessionId}`)
//           .get();
//         // TODO add id to session.id....
//       })
//       .then((docSession: admin.firestore.DocumentData) => {
//         const session = docSession.data();
//         console.log(`Retrieving session: ${JSON.stringify(session)}`);
//
//         const price: number = session.halfBoardRates;
//         const idempotencyKey: string = paymentId;
//         const stripe = new Stripe(functions.config().stripe.key);
//         const description: string = `Payment football camp: ${session.campId} | ${session.id} | ${registrationId}`
//
//         return stripe.charges.create(
//           {
//             amount: price,
//             currency: 'EUR',
//             source: paymentInProgress.stripeTokenId,
//             description: description,
//           },
//           {
//             idempotency_key: idempotencyKey
//           }
//         );
//       })
//       .then(() => {
//         console.log(`Payment achieved successfully`);
//
//         return admin.firestore()
//           .doc(`payments/${paymentId}`)
//           .set(
//             {state: 'ACCEPTED'},
//             {merge: true}
//           )
//       })
//       .then(() => {
//         console.log(`Update registration state`);
//
//         return admin.firestore()
//           .doc(`registrations/${registrationId}`)
//           .set(
//             {state: 'WAITING_APPROVAL'},
//             {merge: true}
//           )
//       });
//   });


export const makePaymentByCard = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
  //TODO check payment is not a duplicate
  return cors(request, response, () => {
    console.info(`IN - makePaymentByCard(${JSON.stringify(request.body)})`);

    const payment = request.body;
    let registration = null;
    let session = null;

    console.info(`Storing payment ${JSON.stringify(payment)} ...`);

    admin.firestore()
      .collection(`payments`)
      .add(payment)
      .then((docPayment: admin.firestore.DocumentReference) => {
        payment.id = docPayment.id;
        console.info(`Payment ${JSON.stringify(payment)} stored.`);
      })
      .then(() => {
        console.info(`Retrieving registration ${payment.registrationId} ...`);
        return admin.firestore()
          .doc(`registrations/${payment.registrationId}`)
          .get();
      })
      .then((docRegistration: admin.firestore.DocumentData) => {
        registration = docRegistration.data();
        registration.id = docRegistration.id;
        console.info(`Registration: ${JSON.stringify(registration)} retrieved.`);
      })
      .then(() => {
        console.info(`Retrieving session ${registration.sessionId} ...`);
        return admin.firestore()
          .doc(`sessions/${registration.sessionId}`)
          .get();
      })
      .then((docSession: admin.firestore.DocumentData) => {
        session = docSession.data();
        session.id = docSession.id;
        console.info(`Session: ${JSON.stringify(session)} retrieved.`);
      })
      .then(() => {
        const price: number = session.halfBoardRates; // TODO * 100 because it's in cents
        const idempotencyKey: string = payment.id;
        const stripe = new Stripe(functions.config().stripe.key);
        const description: string = `Payment football camp: ${session.campId} | ${session.id} | ${registration.id}`;

        const data = {
          amount: price,
          currency: 'EUR',
          source: payment.stripeTokenId,
          description: description,
        }

        const option = {
          idempotency_key: idempotencyKey
        }

        console.info(`Doing payment ${JSON.stringify(data)} ...`);
        return stripe.charges.create(data, option);
      })
      .then(() => {
        console.info(`Payment done successfully. paymentId=${payment.id}`);
        payment.state = 'ACCEPTED';
      })
      .catch((error) => {
        console.error(`An error occured. paymentId=${payment.id}`);
        console.error(error);
        payment.state = 'REJECTED';
      })
      .then(() => {
        console.info(`Updating payment ${payment.id} with state ${payment.state}...`);
        return admin.firestore()
          .doc(`payments/${payment.id}`)
          .set(
            {state: payment.state},
            {merge: true}
          )
      })
      .then(() => {
        console.log(`Payment ${payment.id} updated with state ${payment.state}...`);
        if (payment.state === 'ACCEPTED') {
          console.info(`OUT - 200 - makePaymentByCard(${JSON.stringify(request.body)})`);
          response.status(200).send();
        } else {
          console.error(`OUT - 500 - makePaymentByCard(${JSON.stringify(request.body)})`);
          response.status(500).send();
        }

      })
      .catch((error) => {
        console.error(`OUT - 500 - makePaymentByCard(${JSON.stringify(request.body)})`);
        console.error(error);
        response.status(500).send();
      })
  });
});

export const onUpdatePaymentState = functions.firestore
  .document('payments/{paymentId}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
    if (change.before.data() && (change.before.data().state === change.after.data().state)) {
      console.info('Payment state has not changed');
      return Promise.resolve(null);
    }
    let payment: Payment = change.after.data() as Payment;
    payment.id = change.after.id;

    console.info(`IN - onUpdatePaymentState(payments/${payment.id}), payment = ${JSON.stringify(payment)}`);

    switch (payment.state) {
      case 'ACCEPTED':
        console.info(`Updating registration ${payment.registrationId} to state 'IN_PROGRESS' ...`);
        return admin.firestore()
          .doc(`registrations/${payment.registrationId}`)
          .set(
            {state: 'IN_PROGRESS', paymentId: payment.id},
            {merge: true}
          ).then(() => {
            console.info(`Registration ${payment.registrationId} updated successfully ...`);
          }).catch((error) => {
            console.error(`An error occured during update of registration ${payment.registrationId}`)
          });

      case 'REJECTED':
        console.info(`Updating registration ${payment.registrationId} to state 'REJECTED' ...`);
        return admin.firestore()
          .doc(`registrations/${payment.registrationId}`)
          .set(
            {state: 'REJECTED', paymentId: payment.id},
            {merge: true}
          ).then(() => {
            console.info(`Registration ${payment.registrationId} updated successfully ...`);
          }).catch((error) => {
            console.error(`An error occured during update of registration ${payment.registrationId}`)
          });

      default:
        console.error('Payment state inconsistent');
        return Promise.resolve(null);
    }
  });

export const onUpdateRegistrationState = functions.firestore
  .document('registrations/{registrationId}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
    if (change.before.data() && (change.before.data().state === change.after.data().state)) {
      console.info('Registration state has not changed');
      return Promise.resolve(null);
    }

    const registrationBefore = change.before.data();
    registrationBefore.id = change.before.id;

    const registration = change.after.data();
    registration.id = change.after.id;
    console.info(`IN - onUpdateRegistrationState(registrations/${registration.id}), registration = ${JSON.stringify(registration)}`);

    return admin.firestore()
      .doc(`sessions/${registration.sessionId}`)
      .get()
      .then((snap: DocumentSnapshot) => {
        const session = snap.data();
        const update = {};

        switch (registrationBefore.state) {
          case 'IN_PROGRESS':
            update['numberOfRegistrationsInProgress'] = session.numberOfRegistrationsInProgress - 1;
            break;
          case 'ACCEPTED':
            update['numberOfRegistrationsAccepted'] = session.numberOfRegistrationsAccepted - 1;
            break;
          case 'REJECTED':
            update['numberOfRegistrationsRejected'] = session.numberOfRegistrationsRejected - 1;
            break;
        }

        switch (registration.state) {
          case 'IN_PROGRESS':
            update['numberOfRegistrationsInProgress'] = session.numberOfRegistrationsInProgress + 1;
            break;
          case 'ACCEPTED':
            update['numberOfRegistrationsAccepted'] = session.numberOfRegistrationsAccepted + 1;
            break;
          case 'REJECTED':
            update['numberOfRegistrationsRejected'] = session.numberOfRegistrationsRejected + 1;
            break;
        }

        console.info(`Updating session ${registration.sessionId}, update = ${JSON.stringify(update)}...`);

        return admin.firestore()
          .doc(`sessions/${registration.sessionId}`)
          .set(
            update,
            {merge: true}
          ).then(() => {
            console.info(`Session ${registration.sessionId} updated successfully ...`);
          }).catch((error) => {
            console.error(`An error occured during update of session ${registration.sessionId}`)
          });
      });
  });
