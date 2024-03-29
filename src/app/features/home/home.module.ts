import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {FootcampsListOverviewComponent} from './components/footcamps-list-overview/footcamps-list-overview.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, FootcampsListOverviewComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  providers: [
  ]
})
export class HomeModule {
}
