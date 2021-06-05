import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {AppMaterialModule} from '../../app.material.module';
import { FootcampsListOverviewComponent } from './components/footcamps-list-overview/footcamps-list-overview.component';

@NgModule({
  declarations: [HomeComponent, FootcampsListOverviewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule
  ]
})
export class HomeModule {
}
