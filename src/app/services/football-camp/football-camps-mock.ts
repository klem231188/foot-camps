import {FootballCamp, Session, Overview, Details, Organizer} from './football-camp';

// ------------------------------------
const lorient: FootballCamp = new FootballCamp();
// - Main view
lorient.id = 0;
lorient.latitude = 47.7482524;
lorient.longitude = -3.3702449;
lorient.city = 'Lorient';

// - Overview
lorient.overview = new Overview()
  .withPathToImage('./assets/img/lorient/cover.jpg')
  .withContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withTitle('Bienvenue au Foot Camps de Lorient');

// - Details

lorient.details = new Details()
  .withDescription(`
    Pendant une semaine, les jeunes stagiaires auront la chance de vivre au sein du <b>centre d’entraînement du FC Lorient</b>, de côtoyer les joueurs professionnels et le staff technique. <br>
    Ils pourront ainsi découvrir la vie d’un club professionnel.
    `)
  .withPathToSchedule('./assets/img/lorient/programme.jpg')
  .withLocation(
    `
   TODO
    `
  )
  .withAddress('FC LORIENT - Kerlir - CS 30 131 - 56271 PLOEMEUR Cedex')
  .withGmapsUrl('https://goo.gl/maps/jHxskd6txuK2')
  .withOrganizerDescription(
    `
    Votre enfant bénéficiera d’un programme technique digne des plus grands pour une expérience unique et inoubliable.<br>
    Adaptés au niveau de chacun, les stages Expérience FCL permettront à votre enfant d’améliorer son niveau de jeu dans un climat de convivialité et de respect.<br>
    Les stages sont encadrés par une <b>équipe d’animateurs diplômés</b> (animation et encadrement sportif).
    `
  )
  .withOrganizers([
      new Organizer().withName('Z. ZIDANE').withPathToPicture('./assets/img/examples/zidane.png'),
      new Organizer().withName('C. RONALDO').withPathToPicture('./assets/img/examples/ronaldo.png'),
      new Organizer().withName('A. GRIEZMANN').withPathToPicture('./assets/img/examples/griezmann.png'),
    ]
  )
  .withPathToLogo('./assets/img/lorient/logo.png')
  .withPathToGallery('./assets/img/lorient/gallery/data.json')
  .withSessions([
      new Session().withName('Session 1').withFromDateToDate('Du 10 au 14 juillet 2017').withFullBoardRates(549).withHalfBoardRates(349),
      new Session().withName('Session 2').withFromDateToDate('Du 17 au 21 juillet 2017').withFullBoardRates(549).withHalfBoardRates(349),
      new Session().withName('Session 3').withFromDateToDate('Du 24 au 28 juillet 2017').withFullBoardRates(549).withHalfBoardRates(349),
      new Session().withName('Session 4').withFromDateToDate('Du 31 juillet au 4 août 2017').withFullBoardRates(549).withHalfBoardRates(349)
    ]
  )
  .withRegistrationUrl('https://fclweb.fr/le-club/experience-fcl/#formulaire-dinscription')
  .withUseOnlineRegistration(false);
;

// ------------------------------------
const plouzane: FootballCamp = new FootballCamp();
// - Main view
plouzane.id = 1;
plouzane.latitude = 48.3814380;
plouzane.longitude = -4.6204040;
plouzane.city = 'Plouzané';

// - Overview
plouzane.overview = new Overview()
  .withPathToImage('./assets/img/plouzane/cover.jpg')
  .withContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withTitle('Bienvenue au Foot Camps de Plouzané');

// - Details
plouzane.details = new Details()
  .withDescription(
    `
    Pendant une semaine, les jeunes stagiaires pourront <b>perfectionner la pratique du football</b>. Au programme également  
    visite des belles plages bretonnes, kayak, parc des trois curées...  
    Le tout encadré par <b>une équipe de passionés</b>, joueurs du PAC et bénévoles.<br><br> 
    <b>Infrastructures sportives:</b> <ul><li>1 Terrain synthétique</li><li>2 Terrains en herbe</li><li>2 Gymnases</li></ul> 
    <b>Infrastructures générales:</b> <ul><li>Chambres de 2 à 6 couchages</li><li>Foyer (TV-jeux)</li><li>Salle de restauration</li></ul> 
    `
  )
  .withPathToSchedule('./assets/img/plouzane/programme.jpg')
  .withLocation(
    `
    Le stage se déroule à Plouzané dans le Finistère (29). Les moyens d'accès sont mutiples : voiture, bus ou encore tram.<br>
    Situé au bord de mer, le site bénéficie d'un cadre naturel exceptionnel.<br>
    `
  )
  .withAddress(
    `
   Plouzané A.C Football Stade de Trémaidic, 29280 Plouzané
   `
  )
  .withGmapsUrl('https://goo.gl/maps/6m6qTizWjKs')
  .withOrganizerDescription(
    `
    Votre enfant bénéficiera d’un programme technique digne des plus grands pour une expérience unique et inoubliable.<br>
    Adaptés au niveau de chacun, les stages du PAC permettront à votre enfant d’améliorer son niveau de jeu dans un climat de convivialité et de respect.<br>
    Les stages sont encadrés par une <b>équipe d’animateurs diplômés</b> ainsi qu'un <b>ensemble de bénévoles</b>.
    `
  )
  .withOrganizers([
      new Organizer().withName('Z. ZIDANE').withPathToPicture('./assets/img/examples/zidane.png'),
      new Organizer().withName('C. RONALDO').withPathToPicture('./assets/img/examples/ronaldo.png'),
      new Organizer().withName('A. GRIEZMANN').withPathToPicture('./assets/img/examples/griezmann.png'),
    ]
  )
  .withPathToLogo('./assets/img/plouzane/logo.png')
  .withPathToGallery('./assets/img/plouzane/gallery/data.json')
  .withSessions([
      new Session().withName('Session 1').withFromDateToDate('Du 10 au 14 juillet 2017').withFullBoardRates(350).withHalfBoardRates(null),
      new Session().withName('Session 2').withFromDateToDate('Du 17 au 21 juillet 2017').withFullBoardRates(350).withHalfBoardRates(null),
      new Session().withName('Session 3').withFromDateToDate('Du 24 au 28 juillet 2017').withFullBoardRates(350).withHalfBoardRates(null),
      new Session().withName('Session 4').withFromDateToDate('Du 31 juillet au 4 août 2017').withFullBoardRates(350).withHalfBoardRates(null)
    ]
  )
  .withRegistrationUrl('http://www.plouzane-ac-football.org/inscription-contact.php')
  .withUseOnlineRegistration(false);
;

// ------------------------------------
const plabennec: FootballCamp = new FootballCamp();
// - Main view
plabennec.id = 2;
plabennec.latitude = 48.4999551;
plabennec.longitude = -4.4484149;
plabennec.city = 'Plabennec';

// - Overview
plabennec.overview = new Overview()
  .withPathToImage('./assets/img/plabennec/overview.jpg')
  .withContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withTitle('Bienvenue au Foot Camps de Plabennec');

// - Details
plabennec.details = new Details()
  .withDescription(
    `
    <p>
      Ce stage s'adresse à la fois à ceux voulant s'initier au football, ainsi qu'à ceux voulant se perfectionner.  
      <ul>
       <li>Des <b>ateliers découvertes</b> sont proposés pour les plus jeunes et les non pratiquants souhaitant s'initier</li>
       <li>Des <b>ateliers techniques</b> pour les plus expérimenté(e)s</li>
       <li>Des <b>ateliers spécifiques gardiens de but</b></li>
      </ul>
      L'ensemble des ateliers se déroulent sous différents formats (jeux, défis, ...)
    </p>

    <p>
      Ce stage propose aux enfants d'autres activités extra-sportives : 
      <ul>
       <li>Soccer de Guipavas, pour un tournoi disputé et inoubliable</li>
       <li>La Récré des curés, pour quitter les terrains, se détendre et s’amuser dans le parc de loisir de Milizac</li>
       <li>Un Laser Game, pour une bataille virtuelle entre l’équipe des Rouges et celle des Bleus</li>
      </ul>
    </p>
    
    <b>Infrastructures sportives:</b> <ul><li>A faire</li></ul> 
    <b>Infrastructures générales:</b> <ul><li>A faire</li></ul> 
    `
  )
  .withPathToSchedule('./assets/img/plabennec/programme.jpg')
  .withLocation(
    `
    Situé à l'extrémité de la Bretagne, le stage se déroule à Plabennec dans le Finistère (29).     
    `
  )
  .withAddress(
    `
   Stade Plabennecois Football, Complexe de Kerveguen, 29860 Plabennec
   `
  )
  .withGmapsUrl('https://goo.gl/maps/5GMh35CKxnv')
  .withOrganizerDescription(
    `
    Les stages sont encadrés par une une équipe technique de <b>qualité</b>, <b>expérimentée</b> et <b>motivée</b> <br>
    Cinq joueurs du Stade Plabennecois, sont présents pour encadrer et proposer un programme de qualité.<br> 
    Depuis 4 ans ce stage connait un succès grandissant.
    `
  )
  .withOrganizers([
      new Organizer().withName('Steven COAT').withPathToPicture('./assets/img/plabennec/organizers/avatar/Steven-COAT.jpg'),
      new Organizer().withName('Florian GUILLOU').withPathToPicture('./assets/img/plabennec/organizers/avatar/Florian-GUILLOU.jpg'),
      new Organizer().withName('Matthieu TANGUY').withPathToPicture('./assets/img/plabennec/organizers/avatar/Matthieu-TANGUY.jpg'),
      new Organizer().withName('Christophe LE ROUX').withPathToPicture('./assets/img/plabennec/organizers/avatar/Christophe-LE-ROUX.jpg'),
    ]
  )
  .withPathToLogo('./assets/img/plabennec/logo.png')
  .withPathToGallery('./assets/img/plabennec/gallery/data.json')
  .withSessions([
      new Session().withName('Session 1').withFromDateToDate('Du 10 au 14 juillet 2017').withFullBoardRates(230).withHalfBoardRates(null),
      new Session().withName('Session 2').withFromDateToDate('Du 17 au 21 juillet 2017').withFullBoardRates(230).withHalfBoardRates(null),
      new Session().withName('Session 3').withFromDateToDate('Du 24 au 28 juillet 2017').withFullBoardRates(230).withHalfBoardRates(null),
    ]
  )
  .withRegistrationUrl('http://www.plab29.com/plabete')
  .withUseOnlineRegistration(false);
;

// ------------------------------------
const bourgBlanc: FootballCamp = new FootballCamp();
// - Main view
bourgBlanc.id = 3;
bourgBlanc.latitude = 48.4926696;
bourgBlanc.longitude = -4.508196;
bourgBlanc.city = 'Bourg-Blanc';

// - Overview
bourgBlanc.overview = new Overview()
  .withPathToImage('./assets/img/bourg-blanc/overview.jpg')
  .withContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withTitle('Bienvenue au Foot Camps de Bourg-Blanc');

// - Details
bourgBlanc.details = new Details()
  .withDescription(
    `
    <p>
      Ce stage s'adresse à la fois à ceux voulant s'initier au football, ainsi qu'à ceux voulant se perfectionner.  
      <ul>
       <li>Des <b>ateliers découvertes</b> sont proposés pour les plus jeunes et les non pratiquants souhaitant s'initier</li>
       <li>Des <b>ateliers techniques</b> pour les plus expérimenté(e)s</li>
       <li>Des <b>ateliers spécifiques gardiens de but</b></li>
      </ul>
      L'ensemble des ateliers se déroulent sous différents formats (jeux, défis, ...)
    </p>

    <p>
      Ce stage propose aux enfants d'autres activités extra-sportives : 
      <ul>
       <li>Soccer de Guipavas, pour un tournoi disputé et inoubliable</li>
       <li>La Récré des curés, pour quitter les terrains, se détendre et s’amuser dans le parc de loisir de Milizac</li>
       <li>Un Laser Game, pour une bataille virtuelle entre l’équipe des Rouges et celle des Bleus</li>
      </ul>
    </p>
    
    <b>Infrastructures sportives:</b> <ul><li>A faire</li></ul> 
    <b>Infrastructures générales:</b> <ul><li>A faire</li></ul> 
    `
  )
  .withPathToSchedule('./assets/img/bourg-blanc/programme.jpg')
  .withLocation(
    `
    Situé à l'extrémité de la Bretagne, le stage se déroule à Bourg-Blanc dans le Finistère (29).     
    `
  )
  .withAddress(
    `
   Stade Touroussel, 29860 Bourg-Blanc
   `
  )
  .withGmapsUrl('https://goo.gl/maps/ZVkCSWFT4fs')
  .withOrganizerDescription(
    `
    Les stages sont encadrés par une une équipe technique de <b>qualité</b>, <b>expérimentée</b> et <b>motivée</b> <br>
    TODO
    `
  )
  .withOrganizers([
      new Organizer().withName('Stéphane LE HIR').withPathToPicture('./assets/img/bourg-blanc/organizers/avatar/Stephane-LE-HIR.jpg'),
    ]
  )
  .withPathToLogo('./assets/img/bourg-blanc/logo.png')
  .withPathToGallery('./assets/img/bourg-blanc/gallery/data.json')
  .withSessions([
      new Session().withName('Session 1').withFromDateToDate('Du 10 au 14 juillet 2017').withFullBoardRates(125).withHalfBoardRates(null),
    ]
  )
  .withRegistrationUrl('')
  .withUseOnlineRegistration(true);
;

export const FOOTBAL_CAMPS: FootballCamp[] = [
  lorient,
  plouzane,
  plabennec,
  bourgBlanc
];
