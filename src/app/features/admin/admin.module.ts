import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SharedModule} from '../../shared/shared.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {SessionOverviewComponent} from './components/session-overview/session-overview.component';
import {RegistrationDetailsComponent} from './components/registration-details/registration-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    SessionOverviewComponent,
    RegistrationDetailsComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class AdminModule {
}
