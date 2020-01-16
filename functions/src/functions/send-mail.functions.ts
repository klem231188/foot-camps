import {createTransport, SendMailOptions, Transporter} from 'nodemailer';
import * as functions from 'firebase-functions';
import {RegistrationV2} from '../../../src/app/models/registration-v2.model';
import {Payment} from '../../../src/app/models/payment';
import * as admin from 'firebase-admin';
import {RegistrationState} from '../../../src/app/models/registration-state.enum';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {printReceipt} from './print-registration.functions';
import {FootballCamp} from '../../../src/app/models/football-camp';
import {Session} from '../../../src/app/models/session';

function getMailTransporter(): Transporter {
  return createTransport({
    service: 'gmail',
    auth: {
      user: functions.config().gmail.email,
      pass: functions.config().gmail.password
    }
  });
}

export async function sendMailAboutRegistration(registration: any): Promise<any> {
  console.log(`sendMailAboutRegistration(${JSON.stringify(registration)})`);
  try {
    let sessionSnap: DocumentSnapshot = await admin.firestore().doc(`sessions/${registration.sessionId}`).get();
    let campSnap: DocumentSnapshot = await admin.firestore().doc(`camps/${sessionSnap.data().campId}`).get();

    const mailOptions: SendMailOptions = {
      from: '"Footcamps" <footcamps@firebase.com>',
      to: registration.trainee.email
    };

    switch (registration.state) {
      case RegistrationState.IN_PROGRESS :
        mailOptions.subject = `Inscription à ${campSnap.data().city} prise en compte`;
        mailOptions.html = `Bonjour ${registration.trainee.firstname} ${registration.trainee.lastname},<br>
                            Votre inscription au stage de football ${campSnap.data().city} a bien été prise en compte.<br>
                            Pour que votre inscription soit validée, veuillez envoyer par <b>courrier</b>:
                             <ul>
                               <li>Le paiement (Si chèque, à l'ordre de ${(campSnap.data() as FootballCamp).paymentInfo.checkReceiver})</li>
                               <li>Le reçu (cf pièce-jointe)</li>
                             </ul>
                            à l'addresse suivante:<br>
                            ${(campSnap.data() as FootballCamp).paymentInfo.paymentAddress}
                            <br>
                           `;

        const url = `${functions.config().url.baseurl}/print-receipt?registrationId=${registration.id}`;
        const receiptPdf: Buffer = await printReceipt(url);
        mailOptions.attachments = [
          {
            filename: 'reçu.pdf',
            contentType: 'application/pdf',
            content: receiptPdf
          }
        ];

        break;
      case RegistrationState.ACCEPTED :
        mailOptions.subject = `Inscription à ${campSnap.data().city} validée`;
        mailOptions.html = `Bonjour ${registration.trainee.firstname} ${registration.trainee.lastname},<br> Félicitations, votre inscription au stage de football ${campSnap.data().city} a été validée.<br> Bon stage !`;
        break;
      case RegistrationState.REJECTED :
        mailOptions.subject = `Inscription à ${campSnap.data().city} rejetée`;
        mailOptions.html = `Bonjour ${registration.trainee.firstname} ${registration.trainee.lastname},<br> Hélas votre inscription au stage de football ${campSnap.data().city} a été rejetée!`;
        break;
    }

    await getMailTransporter().sendMail(mailOptions);
    console.log(`A mail has been sent to ${registration.trainee.email} with state ${registration.state}`);
  } catch (e) {
    console.error('There was an error while sending the email:', e);
  }
}

export function sendMailAboutPayment(payment: Payment): Promise<any> {
  // Configure the email transport using the default SMTP transport and a GMail account.
  // For other types of transports such as Sendgrid see https://nodemailer.com/transports/
  console.log(`sendMailAboutPayment(${JSON.stringify(payment)})`);
  console.info(`Retrieving registration ${payment.registrationId} ...`);
  return admin.firestore()
    .doc(`registrations/${payment.registrationId}`)
    .get()
    .then((docRegistration: admin.firestore.DocumentData) => {
      const registration: RegistrationV2 = docRegistration.data() as RegistrationV2;
      registration.id = docRegistration.id;
      console.info(`Registration: ${JSON.stringify(registration)} retrieved.`);
      return registration;
    })
    .then((registration: RegistrationV2) => {
      const mailOptions: SendMailOptions = {
        from: '"Footcamps" <footcamps@firebase.com>',
        to: registration.trainee.email
      };

      if (payment.state === 'IN_PROGRESS') {
        return null;
      } else if (payment.state === 'ACCEPTED') {
        // TODO RegistrationState.ACCEPTED
        mailOptions.subject = 'Paiement à AbersFoot validé';
        mailOptions.html = `Bonjour ${registration.trainee.firstname} ${registration.trainee.lastname},<br>Votre paiement au stage de football AbersFoot a été validé.`;
      } else if (payment.state === 'REJECTED') {
        mailOptions.subject = 'Paiement à AbersFoot rejeté';
        mailOptions.html = `Bonjour ${registration.trainee.firstname} ${registration.trainee.lastname},<br>Votre paiement au stage de football AbersFoot a été rejeté.`;
      }

      return getMailTransporter()
        .sendMail(mailOptions)
        .then((info) => console.log(`A mail has been sent to ${registration.trainee.email} with state ${registration.state}`))
        .catch((error) => console.error('There was an error while sending the email:', error));
    })
}
