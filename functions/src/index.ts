import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Stripe from 'stripe';
import {Change, EventContext} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Payment} from '../../src/app/models/payment';
import {RegistrationV2} from '../../src/app/models/registration-v2.model';
import {addCampAberFoot, addCampPlouguerneau} from './functions/add-camps.functions';
import {printRegistration} from './functions/print-registration.functions';
import {anonymize} from './functions/anonymize.functions';
import {sendMailAboutPayment, sendMailAboutRegistration} from './functions/send-mail.functions';
import {RegistrationState} from '../../src/app/models/registration-state.enum';

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
});

admin.initializeApp();

export const httpAnonymize = functions.https.onRequest(async (request, response) => {
  await anonymize(request, response);
  response.send('anonymize successful');
});

export const httpAddCampAberFoot = functions.https.onRequest((request, response) => {
  return addCampAberFoot(request, response);
});

export const httpAddCampPlouguerneau = functions.https.onRequest((request, response) => {
  return addCampPlouguerneau(request, response);
});

const opts = {timeoutSeconds: 60, memory: '2GB' as '128MB' | '256MB' | '512MB' | '1GB' | '2GB'};
export const httpPrintRegistration = functions.runWith(opts).https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const campId: string = request.body.campId;
      const sessionId: string = request.body.sessionId;
      const registrationId: string = request.body.registrationId;
      const url =  functions.config().url.printregistration + `?campId=${campId}&sessionId=${sessionId}&registrationId=${registrationId}`;
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

export const makePaymentByCard = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
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
        };

        const option = {
          idempotency_key: idempotencyKey
        };

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

export const httpSendMail  = functions.https.onRequest(async (request, response) => {
  await sendMailAboutRegistration({
    state: RegistrationState.IN_PROGRESS,
    sessionId:'KxZ64nZ9ukgdCkl9r2Sv',
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

export const onUpdateRegistrationState = functions.firestore
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
