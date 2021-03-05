import * as mailjet from 'node-mailjet';
import * as functions from 'firebase-functions';
import {RegistrationV2} from '../../../src/app/models/registration-v2.model';
import {Session} from '../../../src/app/models/session';
import {FootballCamp} from '../../../src/app/models/football-camp';
import {Payment} from '../../../src/app/models/payment';
import {PaymentMode} from '../../../src/app/models/payment-mode.enum';

export async function sendMailRegistrationInProgress(
  registration: RegistrationV2,
  payment: Payment,
  session: Session,
  camp: FootballCamp,
) {
  return mailjet
    .connect(functions.config().mailjet.public_key, functions.config().mailjet.secret_key)
    .post('send', {'version': 'v3.1'})
    .request({
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
            'paymentTypesAccepted': camp.paymentInfo.acceptedPaymentTypes,
            'checkAddress': camp.paymentInfo.paymentAddress,
            'endPaymentDate': session.endRegistrationDate,
            'footballcampPrice': payment.reducedPrice ? camp.paymentInfo.prices.halfBoardReducedPrice : camp.paymentInfo.prices.halfBoardPrice
          }
        }
      ]
    })
}

