import {NgModule} from '@angular/core';

import {PrintRoutingModule} from './print-routing.module';
import {PrintEquipmentComponent} from './components/print-equipment/print-equipment.component';
import {SharedModule} from '../../shared/shared.module';
import {PrintRegistrationsComponent} from './components/print-registrations/print-registrations.component';
import {PrintResumeComponent} from './components/print-resume/print-resume.component';


@NgModule({
  declarations: [
    PrintEquipmentComponent,
    PrintRegistrationsComponent,
    PrintResumeComponent
  ],
  imports: [
    SharedModule,
    PrintRoutingModule
  ]
})
export class PrintModule {
}
