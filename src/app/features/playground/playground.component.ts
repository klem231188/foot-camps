import {Component, OnInit} from '@angular/core';
import {RegistrationV2} from '../../models/registration-v2.model';
import {Feet} from '../../models/feet.enum';
import {FieldPosition} from '../../models/field-position.enum';
import {Gender} from '../../models/gender.enum';
import {ShortSize} from '../../models/short-size.enum';
import {DocumentType} from '../../models/document-type.enum';
import {RegistrationState} from '../../models/registration-state.enum';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  registration: RegistrationV2 = {
    'sessionId': 'POMd3zzzZQbCfJYFdpE8',
    'trainee': {
      'birthdate': {'seconds': 1433196000, 'nanoseconds': 0},
      'club': 'psg',
      'email': 'clemtreguer@gmail.com',
      'feet': Feet.LEFT_FOOTED,
      'fieldPosition': FieldPosition.MIDFIELDER,
      'firstname': 'Mikael',
      'gender': Gender.MALE,
      'lastname': 'Renardinho',
      'shoeSize': 32,
      'shortSize': ShortSize.M
    },
    'documents': [{
      'type': DocumentType.FICHE_SANITAIRE,
      'url': 'https://firebasestorage.googleapis.com/v0/b/footcamps-development.appspot.com/o/uploads%2F1604263701411_fiche-sanitaire-remplie.pdf?alt=media&token=dedc245a-076a-4524-8194-1e9483884924'
    }, {
      'type': DocumentType.CERTIFICAT_MEDICAL,
      'url': 'https://firebasestorage.googleapis.com/v0/b/footcamps-development.appspot.com/o/uploads%2F1604263703756_certificat-medical.pdf?alt=media&token=7ab27a7a-1663-4387-a350-aa0754a388a5'
    }, {
      'type': DocumentType.PHOTO_IDENTITE,
      'url': 'https://firebasestorage.googleapis.com/v0/b/footcamps-development.appspot.com/o/uploads%2F1604263707889_charbonnier.jpg?alt=media&token=4dcfa74f-382c-47fe-925a-cb86fe123913'
    }],
    'paymentId': null,
    'state': RegistrationState.PRE_REGISTERED,
    'id': 'PDNND9zT2FC70pF5A8Eq'
  };

  constructor() {
  }

  ngOnInit() {
  }

}
