import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  registration = {
    'sessionId': 'POMd3zzzZQbCfJYFdpE8',
    'trainee': {
      'firstname': 'Mikael',
      'lastname': 'Renardinho',
      'gender': 'MALE',
      'birthdate': {'seconds': 1433196000, 'nanoseconds': 0},
      'email': 'clemtreguer@gmail.com',
      'club': 'psg',
      'fieldPosition': 'MIDFIELDER',
      'feet': 'LEFT_FOOTED',
      'shoeSize': 32,
      'shortSize': 'M'
    },
    'documents': [{
      'type': 'FICHE_SANITAIRE',
      'url': 'https://firebasestorage.googleapis.com/v0/b/footcamps-development.appspot.com/o/uploads%2F1604263701411_fiche-sanitaire-remplie.pdf?alt=media&token=dedc245a-076a-4524-8194-1e9483884924'
    }, {
      'type': 'CERTIFICAT_MEDICAL',
      'url': 'https://firebasestorage.googleapis.com/v0/b/footcamps-development.appspot.com/o/uploads%2F1604263703756_certificat-medical.pdf?alt=media&token=7ab27a7a-1663-4387-a350-aa0754a388a5'
    }, {
      'type': 'PHOTO_IDENTITE',
      'url': 'https://firebasestorage.googleapis.com/v0/b/footcamps-development.appspot.com/o/uploads%2F1604263707889_charbonnier.jpg?alt=media&token=4dcfa74f-382c-47fe-925a-cb86fe123913'
    }],
    'paymentId': null,
    'state': 'PRE_REGISTERED',
    'id': 'PDNND9zT2FC70pF5A8Eq'
  };

  constructor() {
  }

  ngOnInit() {
  }

}
