import {Component, OnInit} from '@angular/core';
import {RegistrationV2} from '../../models/registration-v2.model';
import {ActivatedRoute} from '@angular/router';
import {RegistrationService} from '../../services/registration/registration.service';
import {Dictionary, groupBy} from 'lodash';

@Component({
  selector: 'app-football-camp-print-equipment',
  templateUrl: './football-camp-print-equipment.component.html',
  styleUrls: ['./football-camp-print-equipment.component.scss']
})
export class FootballCampPrintEquipmentComponent implements OnInit {

  displayedShoeSizeColumns: string[] = ['shoeSize', 'quantity', 'trainees'];
  displayedShortSizeColumns: string[] = ['shortSize', 'quantity', 'trainees'];
  shoeSizeDataSource: any[] = [];
  shortSizeDataSource: any[] = [];

  constructor(
    public route: ActivatedRoute,
    public registrationService: RegistrationService
  ) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if (!params.sessionId) {
          console.log('Missing query params !');
        } else {
          this.registrationService.getRegistrations(params.sessionId)
            .subscribe((registrations) => {
              const registrationsGroupedByShoeSize: Dictionary<RegistrationV2[]> = groupBy(registrations, r => r.trainee.shoeSize);
              console.log(JSON.stringify(registrationsGroupedByShoeSize));
              for (const key in registrationsGroupedByShoeSize) {
                if (registrationsGroupedByShoeSize.hasOwnProperty(key)) {
                  const value = registrationsGroupedByShoeSize[key];
                  this.shoeSizeDataSource.push(
                    {
                      shoeSize: key,
                      quantity: value.length,
                      trainees: value.map(r => r.trainee.firstname + ' ' + r.trainee.lastname)
                    }
                  )
                }
              }

              const registrationsGroupedByShortSize: Dictionary<RegistrationV2[]> = groupBy(registrations, r => r.trainee.shortSize);
              console.log(JSON.stringify(registrationsGroupedByShortSize));
              for (const key in registrationsGroupedByShortSize) {
                if (registrationsGroupedByShortSize.hasOwnProperty(key)) {
                  const value = registrationsGroupedByShortSize[key];
                  this.shortSizeDataSource.push(
                    {
                      shortSize: key,
                      quantity: value.length,
                      trainees: value.map(r => r.trainee.firstname + ' ' + r.trainee.lastname)
                    }
                  )
                }
              }

              // this.shortSizeDataSource.push(
              //   {
              //     shortSize: 'XS',
              //     quantity: 10,
              //     trainees: ['Jean ROBERT, Mickaël TERRIEN, Jacques PROVOST, Raphaël VARANE, Michel FOURNIER, Jean VENDETTA, Lucien Goplino, Killyn MBAPPE, Norbert FONTAINE, David POUCHART']
              //   }
              // )
            });
        }
      });
  }
}
