import * as mailjet from 'node-mailjet';
import * as functions from 'firebase-functions';
import {RegistrationV2} from '../../../src/app/models/registration-v2.model';
import {Session} from '../../../src/app/models/session';
import {FootballCamp} from '../../../src/app/models/football-camp';
import {Payment} from '../../../src/app/models/payment';
import {PaymentMode} from '../../../src/app/models/payment-mode.enum';
import {PaymentType} from '../../../src/app/models/payment-type.enum';

export async function sendMailRegistrationInProgress(
  registration: RegistrationV2,
  payment: Payment,
  session: Session,
  camp: FootballCamp,
) {
  console.log('sendMailRegistrationInProgress()');

  let paymentTypesAccepted = [];
  for (const acceptedPaymentType of camp.paymentInfo.acceptedPaymentTypes) {
    switch (acceptedPaymentType) {
      case PaymentType.CARD:
        paymentTypesAccepted.push('Carte Bancaire');
        break;
      case PaymentType.CASH:
        paymentTypesAccepted.push('Espèce');
        break;
      case PaymentType.CHECK:
        paymentTypesAccepted.push('Chèque');
        break;
      case PaymentType.HOLIDAY_CHECK:
        paymentTypesAccepted.push('Chèque vacance');
        break;
      case PaymentType.OTHER:
        paymentTypesAccepted.push('Autre');
        break;
    }
  }

  let request = {
    'Messages': [
      {
        'From': {
          'Email': 'no-reply-footcamps@footcamps.fr',
          'Name': 'footcamps'
        },
        'To': [
          {
            'Email': registration.trainee.email,
          }
        ],
        'TemplateID': 2246320,
        'TemplateLanguage': true,
        'Subject': 'Inscription au stage ' + camp.city + ' en cours',
        'Variables': {
          'traineeFirstname': registration.trainee.firstname,
          'traineeLastname': registration.trainee.lastname,
          'footballcampName': camp.city,
          'paymentModeOnline': payment.mode === PaymentMode.ONLINE,
          'paymentModeInPerson': payment.mode === PaymentMode.IN_PERSON,
          'paymentModeByMail': payment.mode === PaymentMode.BY_MAIL,
          'paymentTypesAccepted': paymentTypesAccepted,
          'checkAddress': camp.paymentInfo.paymentAddress,
          'endPaymentDate': session.endRegistrationDate,
          'footballcampPrice': payment.reducedPrice ? camp.paymentInfo.prices.halfBoardReducedPrice : camp.paymentInfo.prices.halfBoardPrice
        }
      }
    ]
  };

  console.log(JSON.stringify(request));

  return mailjet
    .connect(functions.config().mailjet.public_key, functions.config().mailjet.secret_key)
    .post('send', {'version': 'v3.1'})
    .request(request)
}

export async function sendMailRegistrationAccepted(
  registration: RegistrationV2,
  session: Session,
  camp: FootballCamp,
) {
  console.log('sendMailRegistrationAccepted()');

  let request = {
    'Messages': [
      {
        'From': {
          'Email': 'no-reply-footcamps@footcamps.fr',
          'Name': 'footcamps'
        },
        'To': [
          {
            'Email': registration.trainee.email,
          }
        ],
        'TemplateID': 2641393,
        'TemplateLanguage': true,
        'Subject': 'Inscription au stage ' + camp.city + ' acceptée',
        'Variables': {
          'footballcampName': camp.city,
          'traineeFirstname': registration.trainee.firstname,
          'traineeLastname': registration.trainee.lastname,
          "sessionStartDate": session.start.toDate().toLocaleDateString('fr'),
          "sessionEndDate": session.end.toDate().toLocaleDateString('fr')
        }
      }
    ]
  };

  console.log(JSON.stringify(request));

  return mailjet
    .connect(functions.config().mailjet.public_key, functions.config().mailjet.secret_key)
    .post('send', {'version': 'v3.1'})
    .request(request)
}

export async function sendMailRegistrationRejected(
  registration: RegistrationV2,
  session: Session,
  camp: FootballCamp,
) {
  console.log('sendMailRegistrationRejected()');

  let request = {
    'Messages': [
      {
        'From': {
          'Email': 'no-reply-footcamps@footcamps.fr',
          'Name': 'footcamps'
        },
        'To': [
          {
            'Email': registration.trainee.email,
          }
        ],
        'TemplateID': 2641477,
        'TemplateLanguage': true,
        'Subject': 'Inscription au stage ' + camp.city + ' rejetée',
        'Variables': {
          'footballcampName': camp.city,
          'traineeFirstname': registration.trainee.firstname,
          'traineeLastname': registration.trainee.lastname,
          "sessionStartDate": session.start.toDate().toLocaleDateString('fr'),
          "sessionEndDate": session.end.toDate().toLocaleDateString('fr')
        }
      }
    ]
  };

  console.log(JSON.stringify(request));

  return mailjet
    .connect(functions.config().mailjet.public_key, functions.config().mailjet.secret_key)
    .post('send', {'version': 'v3.1'})
    .request(request)
}
