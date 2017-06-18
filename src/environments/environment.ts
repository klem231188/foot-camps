// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyCIjVlfy-8zDjx6PowDjQ6L28mJYKI_qP0",
    authDomain: "football-camps.firebaseapp.com",
    databaseURL: "https://football-camps.firebaseio.com",
    projectId: "football-camps",
    storageBucket: "",
    messagingSenderId: "882069710443"
  },

  googlemaps: {
    apiKey: "AIzaSyDBIatd6GAUzKDzVabQGNp8WKZ8OgsuRic"
  }
};
