import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {FootballCamp} from '../../src/app/models/football-camp';
import {Organizer} from '../../src/app/models/organizer';
import {Session} from '../../src/app/models/session';
import {Registration} from '../../src/app/models/registration';
import {createTransport, SendMailOptions, SentMessageInfo, Transporter} from 'nodemailer';

admin.initializeApp(functions.config().firebase);

export const addAberCamp = functions.https.onRequest((request, response) => {
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

  const camp: FootballCamp = {
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

  const session: Session = {
    campId: '',
    numberOfRegistrationsAccepted: 0,
    numberOfRegistrationsInProgress: 0,
    numberOfRegistrationsRejected: 0,
    enable: true,
    end: new Date('2018-07-13T12:00:00'),
    endRegistrationDate: new Date('2018-06-009T00:00:00'),
    fullBoardRates: null,
    halfBoardRates: 130,
    maximumNumberOfRegistrations: 30,
    start: new Date('2018-07-09T08:30:00')
  };

  // const session2: Session = {
  //   campId: '',
  //   numberOfRegistrationsAccepted: 0,
  //   numberOfRegistrationsInProgress: 0,
  //   numberOfRegistrationsRejected: 0,
  //   enable: true,
  //   end: new Date('2018-07-24T12:00:00'),
  //   endRegistrationDate: new Date('2018-06-009T00:00:00'),
  //   fullBoardRates: null,
  //   halfBoardRates: 130,
  //   maximumNumberOfRegistrations: 30,
  //   start: new Date('2018-07-20T08:30:00')
  // };

  addCamp(request, response, camp, [session]);
});

export const addPlabennecCamp = functions.https.onRequest((request, response) => {
  const organizer1: Organizer = {
    firstname: 'Steven',
    lastname: 'COAT',
    manageRegistration: true,
    pathToPicture: './assets/img/plabennec/organizers/avatar/Steven-COAT.jpg',
    phoneNumber: '0625253636',
    quote: 'Je suis très heureux de participer à cette 2<sup>ème</sup> édition.<br>Cette année on va redoubler d\'activités pour le bonheur du plus grand nombre d\'enfants'
  };

  const organizer2: Organizer = {
    firstname: 'Florian',
    lastname: 'GUILLOU',
    manageRegistration: true,
    pathToPicture: './assets/img/plabennec/organizers/avatar/Florian-GUILLOU.jpg',
    phoneNumber: '0625253637',
    quote: 'N/A'
  };

  const organizer3: Organizer = {
    firstname: 'Matthieu',
    lastname: 'TANGUY',
    manageRegistration: true,
    pathToPicture: './assets/img/plabennec/organizers/avatar/Matthieu-TANGUY.jpg',
    phoneNumber: '0625253638',
    quote: 'N/A'
  };

  const camp: FootballCamp = {
    city: 'Plabennec Stage d\'été',
    latitude: 48.4999551,
    longitude: -4.4484149,
    details: {
      address: 'Stade Plabennecois Football, Complexe de Kerveguen, 29860 Plabennec',
      description: '<p>\n' +
      '      Ce stage s\'adresse à la fois à ceux voulant s\'initier au football, ainsi qu\'à ceux voulant se perfectionner.\n' +
      '      <ul>\n' +
      '       <li>Des <b>ateliers découvertes</b> sont proposés pour les plus jeunes et les non pratiquants souhaitant s\'initier</li>\n' +
      '       <li>Des <b>ateliers techniques</b> pour les plus expérimenté(e)s</li>\n' +
      '       <li>Des <b>ateliers spécifiques gardiens de but</b></li>\n' +
      '      </ul>\n' +
      '      L\'ensemble des ateliers se déroulent sous différents formats (jeux, défis, ...)\n' +
      '    </p>\n' +
      '\n' +
      '    <p>\n' +
      '      Ce stage propose aux enfants d\'autres activités extra-sportives :\n' +
      '      <ul>\n' +
      '       <li>Soccer de Guipavas, pour un tournoi disputé et inoubliable</li>\n' +
      '       <li>La Récré des curés, pour quitter les terrains, se détendre et s’amuser dans le parc de loisir de Milizac</li>\n' +
      '       <li>Un Laser Game, pour une bataille virtuelle entre l’équipe des Rouges et celle des Bleus</li>\n' +
      '      </ul>\n' +
      '    </p>\n' +
      '\n' +
      '    <b>Infrastructures sportives:</b> <ul><li>A faire</li></ul>\n' +
      '    <b>Infrastructures générales:</b> <ul><li>A faire</li></ul>',
      gmapsUrl: 'https://goo.gl/maps/5GMh35CKxnv',
      location: 'Situé à l\'extrémité de la Bretagne, le stage se déroule à Plabennec dans le Finistère (29).',
      organizerDescription: '    Les stages sont encadrés par une une équipe technique de <b>qualité</b>, <b>expérimentée</b> et <b>motivée</b> <br>\n' +
      '    Cinq joueurs du Stade Plabennecois, sont présents pour encadrer et proposer un programme de qualité.<br>\n' +
      '    Depuis 4 ans ce stage connait un succès grandissant.',
      organizers: [organizer1, organizer2, organizer3],
      pathToGallery: './assets/img/plabennec/gallery/data.json',
      pathToLogo: './assets/img/plabennec/logo.png',
      pathToSchedule: './assets/img/plabennec/programme.jpg',
      useOnlineRegistration: false,
      registrationUrl: 'http://www.plab29.com/plabete',
    },
    overview: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      pathToImage: './assets/img/plabennec/overview.jpg',
      title: 'Bienvenue au Foot Camps de Plabennec'
    }
  };

  const session1: Session = {
    campId: '',
    numberOfRegistrationsAccepted: 0,
    numberOfRegistrationsInProgress: 0,
    numberOfRegistrationsRejected: 0,
    enable: true,
    end: new Date('2018-07-10T12:00:00'),
    endRegistrationDate: new Date('2018-06-009T00:00:00'),
    fullBoardRates: null,
    halfBoardRates: 230,
    maximumNumberOfRegistrations: 30,
    start: new Date('2018-07-14T08:30:00')
  };

  const session2: Session = {
    campId: '',
    numberOfRegistrationsAccepted: 0,
    numberOfRegistrationsInProgress: 0,
    numberOfRegistrationsRejected: 0,
    enable: true,
    end: new Date('2018-07-17T12:00:00'),
    endRegistrationDate: new Date('2018-06-009T00:00:00'),
    fullBoardRates: null,
    halfBoardRates: 230,
    maximumNumberOfRegistrations: 30,
    start: new Date('2018-07-21T08:30:00')
  };

  const session3: Session = {
    campId: '',
    numberOfRegistrationsAccepted: 0,
    numberOfRegistrationsInProgress: 0,
    numberOfRegistrationsRejected: 0,
    enable: true,
    end: new Date('2018-07-24T12:00:00'),
    endRegistrationDate: new Date('2018-06-009T00:00:00'),
    fullBoardRates: null,
    halfBoardRates: 230,
    maximumNumberOfRegistrations: 30,
    start: new Date('2018-07-28T08:30:00')
  };

  addCamp(request, response, camp, [session1, session2, session3]);
});

function addCamp(request, response, camp: FootballCamp, sessions: Session[]): void {
  const db = admin.firestore();
  db.collection('camps')
    .add(camp)
    .then(function (campAdded) {
      console.log('Camp added with ID: ', campAdded.id);

      const sessionsColRef = db.collection('sessions');

      // Begin a new batch
      const batch = db.batch();

      // Set each document, as part of the batch
      sessions.forEach(session => {
        session.campId = campAdded.id;
        const sessionDocRef = sessionsColRef.doc();
        batch.set(sessionDocRef, session);
      })

      // Commit the entire batch
      batch
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

export const sendEmailOnCreateRegistration = functions.firestore
  .document('registrations/{rid}')
  .onCreate(event => {
    console.log(event);
    const registration: Registration = event.data.data();
    return sendMail(registration);
  });

export const sendEmailOnUpdateRegistrationState = functions.firestore
  .document('registrations/{rid}')
  .onUpdate(event => {
    console.log(event);
    const newRegistration: Registration = event.data.data();
    const previousRegistration: Registration = event.data.previous.data();

    if (newRegistration.state !== previousRegistration.state) {
      return sendMail(newRegistration);
    } else {
      console.log('RegistrationState has not changed');
      return null;
    }
  });

function sendMail(registration: Registration): Promise<SentMessageInfo> {
  // Configure the email transport using the default SMTP transport and a GMail account.
  // For other types of transports such as Sendgrid see https://nodemailer.com/transports/
  // TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
  const gmailEmail = functions.config().gmail.email;
  const gmailPassword = functions.config().gmail.password;
  const mailTransport: Transporter = createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword
    }
  });

  const mailOptions: SendMailOptions = {
    from: '"Footcamps" <noreply@firebase.com>',
    to: registration.email
  };

  // Building Email message.
  if (registration.state === 'IN_PROGRESS') {
    // TODO RegistrationState.IN_PROGRESS
    mailOptions.subject = 'Inscription à AbersFoot en cours';
    mailOptions.html = `Bonjour ${registration.firstname} ${registration.lastname},<br> Votre inscription au stage de football AbersFoot a bien été prise en compte.<br> Pour la valider, il faut <b>payer la somme de 130€ à Stéphane le HIR </b> par chèque ou chèque vacance avant le 09 Juin 2018.`;
  } else if (registration.state === 'ACCEPTED') {
    // TODO RegistrationState.ACCEPTED
    mailOptions.subject = 'Inscription à AbersFoot validée';
    mailOptions.html = `Bonjour ${registration.firstname} ${registration.lastname},<br> Félicitations, votre inscription au stage de football AbersFoot a été validée.<br> Bon stage !`;
  } else {
    mailOptions.subject = 'Inscription à AbersFoot rejetée';
    mailOptions.html = `Bonjour ${registration.firstname} ${registration.lastname},<br> Hélas votre inscription au stage de football AbersFoot a été rejetée!`;
  }

  return mailTransport
    .sendMail(mailOptions)
    .then(() => console.log(`A mail has been sent to ${registration.email} with state ${registration.state}`))
    .catch(error => console.error('There was an error while sending the email:', error));
}

//TODO : BUG - mise à jour nombre d'inscription acceptées/refusées/en cours
// export const onUpdateRegistration = functions.firestore
//   .document('registrations/{rid}')
//   .onCreate(event => {
//     console.log(event);
//     const registration: Registration = event.data.data();
//     return sendMail(registration);
//   });
