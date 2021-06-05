import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FootballCampHomeComponent} from './components/football-camp-home/football-camp-home.component';
import {FootballCampLocatorComponent} from './components/football-camp-locator/football-camp-locator.component';
import {FootballCampDetailsV2Component} from './components/football-camp-details-v2/football-camp-details-v2.component';
import {FootballCampLoginComponent} from './components/football-camp-login/football-camp-login.component';
import {FootballCampAdminDashboardComponent} from './components/football-camp-admin-dashboard/football-camp-admin-dashboard.component';
import {FootballCampPrintRegistrationComponent} from './components/football-camp-print-registration/football-camp-print-registration.component';
import {FootballCampPrintRegistrationsComponent} from './components/football-camp-print-registrations/football-camp-print-registrations.component';
import {FootballCampPrintReceiptComponent} from './components/football-camp-print-receipt/football-camp-print-receipt.component';
import {FootballCampPrintEquipmentComponent} from './components/football-camp-print-equipment/football-camp-print-equipment.component';
import {PlaygroundComponent} from './components/playground/playground.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: FootballCampHomeComponent},
  {path: 'locate/:id/registration-v2', component: FootballCampLocatorComponent, data: {type: 'registration'}},
  {path: 'locate/:id/details-v2', component: FootballCampLocatorComponent, data: {type: 'details'}},
  {path: 'details-v2/:id', component: FootballCampDetailsV2Component},
  {path: 'login', component: FootballCampLoginComponent},
  {path: 'admin-dashboard', component: FootballCampAdminDashboardComponent},
  {path: 'print-registration', component: FootballCampPrintRegistrationComponent},
  {path: 'print-registrations', component: FootballCampPrintRegistrationsComponent},
  {path: 'print-receipt', component: FootballCampPrintReceiptComponent},
  {path: 'print-equipment', component: FootballCampPrintEquipmentComponent},
  {path: 'playground', component: PlaygroundComponent},
  {path: 'v2/home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
