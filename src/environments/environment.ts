// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyC3-PHV_djUew_Uy2vqZ6UPejW0YKlHRt4",
    authDomain: "footcamps-production.firebaseapp.com",
    databaseURL: "https://footcamps-production.firebaseio.com",
    projectId: "footcamps-production",
    storageBucket: "footcamps-production.appspot.com",
    messagingSenderId: "881714365127"
  },

  googlemaps: {
    apiKey: "AIzaSyDBIatd6GAUzKDzVabQGNp8WKZ8OgsuRic"
  }
};
