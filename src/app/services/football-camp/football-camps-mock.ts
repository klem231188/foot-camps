import {FootballCamp, Session, Overview, Details} from "./football-camp";

//------------------------------------
let lorient: FootballCamp = new FootballCamp();
//- Main view
lorient.id = 0;
lorient.latitude = 47.7482524;
lorient.longitude = -3.3702449;
lorient.city = 'Lorient';

//- Overview
lorient.overview = new Overview()
  .withPathToImage('./assets/img/lorient/cover.jpg')
  .withContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withTitle('Bienvenue au Foot Camps de Lorient');

//- Details

lorient.details = new Details()
  .withDescription(`
    Pendant une semaine, les jeunes stagiaires auront la chance de vivre au sein du <b>centre d’entraînement du FC Lorient</b>, de côtoyer les joueurs professionnels et le staff technique. <br>
    Ils pourront ainsi découvrir la vie d’un club professionnel.
    `)
  .withPathToLogo('./assets/img/lorient/logo.png')
  .withPathToGallery('./assets/img/lorient/gallery/data.json')
  .withSessions([
      new Session().withName('Session 1').withFromDateToDate('Du 10 au 14 juillet 2017').withFullBoardRates(549).withHalfBoardRates(349),
      new Session().withName('Session 2').withFromDateToDate('Du 17 au 21 juillet 2017').withFullBoardRates(549).withHalfBoardRates(349),
      new Session().withName('Session 3').withFromDateToDate('Du 24 au 28 juillet 2017').withFullBoardRates(549).withHalfBoardRates(349),
      new Session().withName('Session 4').withFromDateToDate('Du 31 juillet au 4 août 2017').withFullBoardRates(549).withHalfBoardRates(349)
    ]
  );

//------------------------------------
let plouzane: FootballCamp = new FootballCamp();
//- Main view
plouzane.id = 1;
plouzane.latitude = 48.3814380;
plouzane.longitude = -4.6204040;
plouzane.city = 'Plouzané';

//- Overview
plouzane.overview = new Overview()
  .withPathToImage('./assets/img/plouzane/cover.jpg')
  .withContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withTitle('Bienvenue au Foot Camps de Plouzané');

//- Details
plouzane.details = new Details()
  .withDescription(
    `
    Pendant une semaine, les jeunes stagiaires pourront <b>perfectionner la pratique du football</b>. Au programme également  
    visite des belles plages bretonnes, kayak, parc des trois curées...  
    Le tout encadré par <b>une équipe de passionés</b>, joueurs du PAC et bénévoles.<br><br> 
    Infrastructures sportives: <ul><li>1 Terrain synthétique</li><li>2 Terrains en herbe</li><li>2 Gymnases</li></ul> 
    Infrastructures générales: <ul><li>Chambres de 2 à 6 couchages</li><li>Foyer (TV-jeux)</li><li>Salle de restauration</li></ul> 
    `
  )
  .withLinkToPlanning('javascript:void(0)')
  .withPathToLogo('./assets/img/plouzane/logo.png')
  .withPathToGallery('./assets/img/plouzane/gallery/data.json')
  .withSessions([
      new Session().withName('Session 1').withFromDateToDate('Du 10 au 14 juillet 2017').withFullBoardRates(350).withHalfBoardRates(null),
      new Session().withName('Session 2').withFromDateToDate('Du 17 au 21 juillet 2017').withFullBoardRates(350).withHalfBoardRates(null),
      new Session().withName('Session 3').withFromDateToDate('Du 24 au 28 juillet 2017').withFullBoardRates(350).withHalfBoardRates(null),
      new Session().withName('Session 4').withFromDateToDate('Du 31 juillet au 4 août 2017').withFullBoardRates(350).withHalfBoardRates(null)
    ]
  );

export const FOOTBAL_CAMPS: FootballCamp[] = [
  lorient,
  plouzane
];
