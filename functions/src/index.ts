import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Change, EventContext} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {RegistrationV2} from '../../src/app/models/registration-v2.model';
import {Session} from '../../src/app/models/session';
import {setCampAber, setCampAber2022, setCampPlabennec, setCampPlouguerneau, setCampScLannilisFutsal} from './functions/add-camps.functions';
import {printEquipment, printReceipt, printRegistration, printRegistrations} from './functions/print-registration.functions';
import {anonymize} from './functions/anonymize.functions';
import {createPaymentIntent} from './functions/stripe.functions';
import {purgePayments} from './functions/purge-payments.functions';
import {purgeRegistrations} from './functions/purge-registrations.functions';
import {sendMailRegistrationAccepted, sendMailRegistrationInProgress, sendMailRegistrationRejected} from './functions/mailjet.functions';
import {Payment} from '../../src/app/models/payment';
import {FootballCamp} from '../../src/app/models/football-camp';

// Initialize firebase-admin
admin.initializeApp();

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
});

export const httpAnonymize = functions.https.onRequest(async (request, response) => {
  await anonymize(request, response);
  response.send('anonymize successful');
});

export const httpSetCampPlouguerneau = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
      try {
        await setCampPlouguerneau();
        response.send('httpSetCampPlouguerneau successful');
      } catch (e) {
        console.log(e);
        response.status(500).send('httpSetCampPlouguerneau unsuccessful');
      }
    }
  )
});

export const httpSetCampPlabennec = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
      try {
        await setCampPlabennec();
        response.send('httpSetCampPlabennec successful');
      } catch (e) {
        response.status(500).send('httpSetCampPlabennec unsuccessful');
      }
    }
  )
});

export const httpSetCampAber = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
      try {
        await setCampAber();
        response.send('httpSetCampAber successful');
      } catch (e) {
        response.status(500).send('httpSetCampAber unsuccessful');
      }
    }
  )
});

export const httpSetCampScLannilisFutsal = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
      try {
        await setCampScLannilisFutsal();
        response.send('httpSetCampScLannilisFutsal successful');
      } catch (e) {
        response.status(500).send('httpSetCampScLannilisFutsal unsuccessful');
      }
    }
  )
});

export const httpSetCampAber2022 = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
      try {
        await setCampAber2022();
        response.send('httpSetCampAber2022 successful');
      } catch (e) {
        response.status(500).send('httpSetCampAber2022 unsuccessful');
      }
    }
  )
});

export const httpPaymentIntent = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const paymentId: string = request.body.paymentId;
      const paymentIntent = await createPaymentIntent(paymentId);
      response.send(paymentIntent);
    } catch (error) {
      console.log('Error while creating payment intent', error);
      response.status(500).send(error);
    }
  });
});

export const httpPurgePayments = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      await purgePayments();
      response.status(200).send('Payments purged');
    } catch (error) {
      console.log('Error while purging payments', error);
      response.status(500).send(error);
    }
  });
});

export const httpPurgeRegistrations = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      await purgeRegistrations();
      response.status(200).send('Registrations purged');
    } catch (error) {
      console.log('Error while purging registrations', error);
      response.status(500).send(error);
    }
  });
});

const opts = {timeoutSeconds: 60, memory: '2GB' as '128MB' | '256MB' | '512MB' | '1GB' | '2GB'};
export const httpPrintRegistration = functions.runWith(opts).https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const campId: string = request.body.campId;
      const sessionId: string = request.body.sessionId;
      const registrationId: string = request.body.registrationId;
      const url = functions.config().url.printregistration + `?campId=${campId}&sessionId=${sessionId}&registrationId=${registrationId}`;
      const screenshot: Buffer = await printRegistration(url);
      console.log('Success while rendering registration');
      response.setHeader('Content-Type', 'image/png');
      response.setHeader('Content-Disposition', `attachment; filename=${registrationId}.png`);
      response.send(screenshot);
    } catch (error) {
      console.log('Error while rendering registration', error);
      response.status(500).send(error);
    }
  });
});

export const httpPrintEquipment = functions.runWith(opts).https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const sessionId: string = request.body.sessionId;
      const url = functions.config().url.baseurl + `/print-equipment?sessionId=${sessionId}`;
      const exportEquipment: Buffer = await printEquipment(url);
      console.log('Success while rendering equipment');
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader('Content-disposition', 'attachment; filename=rapport-equipement.pdf');

      response.status(200).send(exportEquipment);
    } catch (error) {
      console.log('Error while rendering equipment', error);
      response.status(500).send(error);
    }
  });
});

export const httpPrintReceipt = functions.runWith(opts).https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const registrationId: string = request.body.registrationId;
      const url = functions.config().url.baseurl + `/print-receipt?registrationId=${registrationId}`;
      const receipt: Buffer = await printReceipt(url);
      console.log('Success while rendering receipt');
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader('Content-disposition', 'attachment; filename=receipt.pdf');

      response.status(200).send(receipt);
    } catch (error) {
      console.log('Error while rendering receipt', error);
      response.status(500).send(error);
    }
  });
});

export const httpPrintRegistrations = functions.runWith(opts).https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const sessionId: string = request.body.sessionId;
      const url = functions.config().url.baseurl + `/print-registrations?sessionId=${sessionId}`;
      const registrations: Buffer = await printRegistrations(url);
      console.log('Success while rendering registrations');
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader('Content-disposition', 'attachment; filename=registrations.pdf');

      response.status(200).send(registrations);
    } catch (error) {
      console.log('Error while rendering registrations', error);
      response.status(500).send(error);
    }
  });
});

// export const onUpdatePaymentState = functions.firestore
//   .document('payments/{paymentId}')
//   .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
//     if (change.before.data() && (change.before.data().state === change.after.data().state)) {
//       console.info('Payment state has not changed');
//       return Promise.resolve(null);
//     }
//     const payment: Payment = change.after.data() as Payment;
//     payment.id = change.after.id;
//
//     console.info(`IN - onUpdatePaymentState(payments/${payment.id}), payment = ${JSON.stringify(payment)}`);
//
//     console.info(`Updating paymentId in registrations/${payment.registrationId}' ...`);
//     return admin.firestore()
//       .doc(`registrations/${payment.registrationId}`)
//       .set(
//         {paymentId: payment.id},
//         {merge: true}
//       ).then(() => {
//         console.info(`Registration ${payment.registrationId} updated successfully ...`);
//       }).catch((error) => {
//         console.error(`An error occured during update of registration ${payment.registrationId}`)
//       }).then(() => {
//         return sendMailAboutPayment(payment);
//       });
//   });

export const onUpdateRegistrationState = functions.runWith(opts).firestore
  .document('registrations/{registrationId}')
  .onUpdate(async (change: Change<DocumentSnapshot>, context: EventContext) => {
    try {
      if (change.before.data() && (change.before.data().state === change.after.data().state)) {
        console.info('Registration state has not changed');
        return;
      }

      const registrationBefore: RegistrationV2 = change.before.data() as RegistrationV2;
      registrationBefore.id = change.before.id;

      const registration: RegistrationV2 = change.after.data() as RegistrationV2;
      registration.id = change.after.id;
      console.info(`IN - onUpdateRegistrationState(registrations/${registration.id}), registration = ${JSON.stringify(registration)}`);

      const sessionSnapshot = await admin.firestore().doc(`sessions/${registration.sessionId}`).get();
      const session = sessionSnapshot.data() as Session;
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
      await admin.firestore().doc(`sessions/${registration.sessionId}`).set(update, {merge: true});
      console.info(`Session ${registration.sessionId} updated successfully ...`);

      const campSnap = await admin.firestore().doc(`camps/${session.campId}`).get();
      const camp = campSnap.data() as FootballCamp;

      if (registration.state === 'IN_PROGRESS') {
        const paymentSnap = await admin.firestore().doc(`payments/${registration.paymentId}`).get();
        const payment = paymentSnap.data() as Payment;
        await sendMailRegistrationInProgress(registration, payment, session, camp);
      } else if (registration.state === 'ACCEPTED') {
        await sendMailRegistrationAccepted(registration, session, camp);
      } else if (registration.state === 'REJECTED') {
        await sendMailRegistrationRejected(registration, session, camp);
      }
    } catch (e) {
      console.error(`An error occured during onUpdateRegistration ${change.after.data()}`, e);
    }
  });
