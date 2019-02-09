export const environment = {
  production: true,

  firebase: {
    apiKey: 'AIzaSyC3-PHV_djUew_Uy2vqZ6UPejW0YKlHRt4',
    authDomain: 'footcamps-production.firebaseapp.com',
    databaseURL: 'https://footcamps-production.firebaseio.com',
    projectId: 'footcamps-production',
    storageBucket: 'footcamps-production.appspot.com',
    messagingSenderId: '881714365127'
  },

  googlemaps: {
    apiKey: 'AIzaSyAjXxIVE0GpPfkrCcUX4ry_GWJKl0l74t0'
  },

  stripe: {
    publicKey: 'pk_live_SeIBaotean3l4AaSasWlmMxG'
  },

  urlMakePaymentByCard: 'https://us-central1-footcamps-production.cloudfunctions.net/makePaymentByCard',
  urlGeneratePdf: 'https://us-central1-footcamps-production.cloudfunctions.net/generatePdf'
};
