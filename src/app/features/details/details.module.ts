import {NgModule} from '@angular/core';

import {DetailsRoutingModule} from './details-routing.module';
import {DetailsComponent} from './details.component';
import {InViewportModule} from '@thisissoon/angular-inviewport';
import {BadgesComponent} from './components/badges/badges.component';
import {SharedModule} from '../../shared/shared.module';
import {BadgeComponent} from './components/badge/badge.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@NgModule({
  declarations: [
    DetailsComponent,
    BadgesComponent,
    BadgeComponent
  ],
  imports: [
    SharedModule,
    DetailsRoutingModule,
    InViewportModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class DetailsModule {

}
