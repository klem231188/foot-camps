// // import {printRegistration, printEquipment} from './print-registration.functions';
// // import fs from 'fs';
// //
// // (async () => {
// //   const campId: string = '8zG6SI08QsVCeWSZ0IpE';
// //   const registrationId: string = 'yZdzhyW5mJzhzqMZuZgX';
// //   // const sessionId: string = '2OaKNnFUDJkc9kg2RaTS';
// //   const sessionId: string = 'POMd3zzzZQbCfJYFdpE8';
// //
// //   let from = new Date();
// //   // const url = 'https://footcamps-development.firebaseapp.com/print-registration' + `?campId=${campId}&sessionId=${sessionId}&registrationId=${registrationId}`;
// //   const url = 'http://localhost:4200/print-equipment' + `?sessionId=${sessionId}`;
// //   // const url = 'https://footcamps-development.firebaseapp.com/locate/8zG6SI08QsVCeWSZ0IpE/details-v2';
// //   // const url = 'https://www.youtube.com/watch?v=i8THvr03FaY';
// //   let buffer = await printEquipment(url);
// //   // let buffer = await printRegistration(url);
// //   fs.writeFile("/home/clement/Bureau/test.pdf", buffer, function(err) {
// //     if(err) {
// //       return console.log(err);
// //     }
// //     console.log("The file was saved!");
// //     let to = new Date();
// //     console.log(`Duration ${to.getTime() - from.getTime()} ms`)
// //   });
// // })();
// import {sendMailAboutRegistration} from './send-mail.functions';
// import {RegistrationV2} from '../../../src/app/models/registration-v2.model';
// import {RegistrationState} from '../../../src/app/models/registration-state.enum';
// import {Category} from '../../../src/app/models/category.enum';
// import {Feet} from '../../../src/app/models/feet.enum';
// import {FieldPosition} from '../../../src/app/models/field-position.enum';
// import {Gender} from '../../../src/app/models/gender.enum';
// import {ShortSize} from '../../../src/app/models/short-size.enum';
//
// (async () => {
//   const registration: RegistrationV2 = {
//     sessionId: 'POMd3zzzZQbCfJYFdpE8',
//     trainee: {
//       birthdate: '',
//       category: Category.U7,
//       club: 'GSY',
//       email: 'clemtreguer@gmail.com',
//       feet: Feet.LEFT_FOOTED,
//       fieldPosition: FieldPosition.MIDFIELDER,
//       firstname: 'Johnny',
//       gender: Gender.MALE,
//       lastname: 'Vendetta',
//       shoeSize: 25,
//       shortSize: ShortSize.L
//     },
//     documents: [],
//     paymentId: '',
//     state: RegistrationState.ACCEPTED
//   };
//
//   await sendMailAboutRegistration(registration);
// })();
