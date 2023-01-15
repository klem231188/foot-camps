import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrintEquipmentComponent} from './components/print-equipment/print-equipment.component';
import {PrintRegistrationsComponent} from './components/print-registrations/print-registrations.component';
import {PrintResumeComponent} from './components/print-resume/print-resume.component';
import {PrintResumeEnglishComponent} from './components/print-resume-en/print-resume-english.component';

const routes: Routes = [
  {path: 'equipment', component: PrintEquipmentComponent},
  {path: 'registrations', component: PrintRegistrationsComponent},
  {path: 'resume', component: PrintResumeComponent},
  {path: 'resume-english', component: PrintResumeEnglishComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintRoutingModule {
}
