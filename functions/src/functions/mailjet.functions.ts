import * as mailjet from 'node-mailjet';
import * as functions from 'firebase-functions';

export async function sendMailRegistrationInProgress() {
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
              'Email': 'clemtreguer@gmail.com',
              'Name': 'Clement'
            }
          ],
          'TemplateID': 2246320,
          'TemplateLanguage': true,
          'Subject': 'Inscription en cours',
          'Variables': {
            'traineeFirstname': 'Clément',
            'traineeLastname': 'Tréguer',
            'footballcampName': 'Plabété',
            'paymentModeOnline': true,
            'paymentModeInPerson': false,
            'paymentModeByMail': false,
            'paymentTypesAccepted': ['Chèque', 'Espèce', 'Coupon sport', 'Chèques vacances'],
            'checkAddress': '22 rue des moulins 29860 Plouvien',
            'endPaymentDate': '3 Juillet 2021',
            'footballcampPrice': '230 €'
          }
        }
      ]
    })
}

