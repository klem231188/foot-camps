import {NgModule} from '@angular/core';

import {PrintRoutingModule} from './print-routing.module';
import {PrintEquipmentComponent} from './components/print-equipment/print-equipment.component';
import {SharedModule} from '../../shared/shared.module';
import {PrintRegistrationsComponent} from './components/print-registrations/print-registrations.component';


@NgModule({
  declarations: [
    PrintEquipmentComponent,
    PrintRegistrationsComponent
  ],
  imports: [
    SharedModule,
    PrintRoutingModule
  ]
})
export class PrintModule {
}
