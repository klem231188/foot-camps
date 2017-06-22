import {FootballCamp, Session} from "./football-camp";

let lorient: FootballCamp = new FootballCamp();
lorient.id = 0;
lorient.latitude = 47.7482524;
lorient.longitude = -3.3702449;
lorient.ville = 'Lorient';
lorient.pathToImage = './assets/img/lorient/cover.jpg';
lorient.title = 'Bienvenue au Foot Camps de Lorient';
lorient.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
lorient.pathToLogo = './assets/img/lorient/logo.png';
lorient.pathToGallery = './assets/img/lorient/gallery/data.json';
lorient.sessions = [
  new Session('Session 1', 'Du 10 au 14 juillet 2017', 549, 349),
  new Session('Session 2', 'Du 17 au 21 juillet 2017', 549, 349),
  new Session('Session 3', 'Du 24 au 28 juillet 2017', 549, 349),
  new Session('Session 4', 'Du 31 au 4 juillet 2017', 549, 349)
];

let plouzane: FootballCamp = new FootballCamp();
plouzane.id = 1;
plouzane.latitude = 48.3814380;
plouzane.longitude = -4.6204040;
plouzane.ville = 'Plouzané';
plouzane.pathToImage = './assets/img/examples/camp1.jpg';
plouzane.title = 'Bienvenue au Foot Camps de Plouzané';
plouzane.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
plouzane.pathToLogo = './assets/img/plouzane/logo.png';
plouzane.pathToGallery = './assets/img/plouzane/gallery/data.json';
plouzane.sessions = [
  new Session('Session 1', 'Du 10 au 14 juillet 2017', 350, null),
  new Session('Session 2', 'Du 17 au 21 juillet 2017', 350, null),
  new Session('Session 3', 'Du 24 au 28 juillet 2017', 350, null),
  new Session('Session 4', 'Du 31 au 4 juillet 2017', 350, null)
];

export const FOOTBAL_CAMPS: FootballCamp[] = [
  lorient,
  plouzane
];
