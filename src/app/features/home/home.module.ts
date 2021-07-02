import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {FootcampsListOverviewComponent} from './components/footcamps-list-overview/footcamps-list-overview.component';
import {SharedModule} from '../../shared/shared.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@NgModule({
  declarations: [HomeComponent, FootcampsListOverviewComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class HomeModule {
}
