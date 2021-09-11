import {NgModule} from '@angular/core';

import {DetailsRoutingModule} from './details-routing.module';
import {DetailsComponent} from './details.component';
import {InViewportModule} from '@thisissoon/angular-inviewport';
import {BadgesComponent} from './components/badges/badges.component';
import {SharedModule} from '../../shared/shared.module';
import {BadgeComponent} from './components/badge/badge.component';

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
  ]
})
export class DetailsModule {

}
