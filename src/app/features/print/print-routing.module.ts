import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrintEquipmentComponent} from './components/print-equipment/print-equipment.component';
import {PrintRegistrationsComponent} from './components/print-registrations/print-registrations.component';

const routes: Routes = [
  {path: 'equipment', component: PrintEquipmentComponent},
  {path: 'registrations', component: PrintRegistrationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintRoutingModule {
}
