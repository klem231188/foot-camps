export const environment = {
  production: false,

  firebase: {
    apiKey: 'AIzaSyAnpsARLy9iqTxXifvc3Y6105WIr-hRGUY',
    authDomain: 'footcamps-development.firebaseapp.com',
    databaseURL: 'https://footcamps-development.firebaseio.com',
    projectId: 'footcamps-development',
    storageBucket: 'footcamps-development.appspot.com',
    messagingSenderId: '774401230958'
  },

  googlemaps: {
    apiKey: 'AIzaSyB0IXClx4bDQAXDVQRvLP84nJNbWCt4PyA'
  },

  stripe: {
    publicKey: 'pk_test_BvSQqrD7gILIfBpT2i2x4505'
  },

  urlMakePaymentByCard: 'https://us-central1-footcamps-development.cloudfunctions.net/makePaymentByCard',
  urlGeneratePdf: 'https://us-central1-footcamps-development.cloudfunctions.net/httpGeneratePdf',
  urlPrintRegistration: 'https://us-central1-footcamps-development.cloudfunctions.net/httpPrintRegistration',
  urlPrintRegistrations: 'https://us-central1-footcamps-development.cloudfunctions.net/httpPrintRegistrations',
  urlPrintEquipment: 'https://us-central1-footcamps-development.cloudfunctions.net/httpPrintEquipment',
  urlPaymentIntent: 'https://us-central1-footcamps-development.cloudfunctions.net/httpPaymentIntent'
};
