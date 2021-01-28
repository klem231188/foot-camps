import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Change, EventContext} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Payment} from '../../src/app/models/payment';
import {RegistrationV2} from '../../src/app/models/registration-v2.model';
import {setCampAber, setCampPlabennec, setCampPlouguerneau} from './functions/add-camps.functions';
import {printEquipment, printReceipt, printRegistration, printRegistrations} from './functions/print-registration.functions';
import {anonymize} from './functions/anonymize.functions';
import {createPaymentIntent} from './functions/stripe.functions';
import {sendMailAboutPayment, sendMailAboutRegistration} from './functions/send-mail.functions';
import {RegistrationState} from '../../src/app/models/registration-state.enum';

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

export const httpSendMail = functions.https.onRequest(async (request, response) => {
  await sendMailAboutRegistration({
    state: RegistrationState.IN_PROGRESS,
    sessionId: 'KxZ64nZ9ukgdCkl9r2Sv',
    trainee: {
      firstname: 'Clément',
      lastname: 'TREGUER',
      email: 'clemtreguer@gmail.com',
    }
  });
  response.send('anonymize successful');
});

export const onUpdatePaymentState = functions.firestore
  .document('payments/{paymentId}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
    if (change.before.data() && (change.before.data().state === change.after.data().state)) {
      console.info('Payment state has not changed');
      return Promise.resolve(null);
    }
    const payment: Payment = change.after.data() as Payment;
    payment.id = change.after.id;

    console.info(`IN - onUpdatePaymentState(payments/${payment.id}), payment = ${JSON.stringify(payment)}`);

    console.info(`Updating paymentId in registrations/${payment.registrationId}' ...`);
    return admin.firestore()
      .doc(`registrations/${payment.registrationId}`)
      .set(
        {paymentId: payment.id},
        {merge: true}
      ).then(() => {
        console.info(`Registration ${payment.registrationId} updated successfully ...`);
      }).catch((error) => {
        console.error(`An error occured during update of registration ${payment.registrationId}`)
      }).then(() => {
        return sendMailAboutPayment(payment);
      });
  });

export const onUpdateRegistrationState = functions.runWith(opts).firestore
  .document('registrations/{registrationId}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
    if (change.before.data() && (change.before.data().state === change.after.data().state)) {
      console.info('Registration state has not changed');
      return Promise.resolve(null);
    }

    const registrationBefore: RegistrationV2 = change.before.data() as RegistrationV2;
    registrationBefore.id = change.before.id;

    const registration: RegistrationV2 = change.after.data() as RegistrationV2;
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
            console.error(`An error occured during update of session ${registration.sessionId}`);
          });
      })
      .then(() => {
        return sendMailAboutRegistration(registration);
      })
  });
