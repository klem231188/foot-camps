// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

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
  }
};
