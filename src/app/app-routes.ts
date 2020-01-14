import {Routes} from '@angular/router';
import {FootballCampDetailsComponent} from './components/football-camp-details/football-camp-details.component';
import {FootballCampLocatorComponent} from './components/football-camp-locator/football-camp-locator.component';
import {FootballCampRegistrationComponent} from 'app/components/football-camp-registration/football-camp-registration.component';
import {FootballCampLoginComponent} from './components/football-camp-login/football-camp-login.component';
import {PlaygroundComponent} from './components/playground/playground.component';
import {FootballCampAdminDashboardComponent} from './components/football-camp-admin-dashboard/football-camp-admin-dashboard.component';
import {FootballCampPrintRegistrationComponent} from './components/football-camp-print-registration/football-camp-print-registration.component';
import {FootballCampHomeComponent} from './components/football-camp-home/football-camp-home.component';
import {FootballCampDetailsV2Component} from './components/football-camp-details-v2/football-camp-details-v2.component';
import {FootballCampPrintEquipmentComponent} from './components/football-camp-print-equipment/football-camp-print-equipment.component';
import {FootballCampPrintReceiptComponent} from './components/football-camp-print-receipt/football-camp-print-receipt.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: FootballCampHomeComponent},
  {path: 'locate/:id/registration-v2', component: FootballCampLocatorComponent, data: {type: 'registration'}},
  {path: 'locate/:id/details-v2', component: FootballCampLocatorComponent, data: {type: 'details'}},
  {path: 'locate/:id/details', component: FootballCampDetailsComponent},
  {path: 'locate/:id', component: FootballCampLocatorComponent, data: {type: 'overview'}},
  {path: 'locate', component: FootballCampLocatorComponent, data: {type: 'locate'}},
  {path: 'details/:id', component: FootballCampDetailsComponent},
  {path: 'details-v2/:id', component: FootballCampDetailsV2Component},
  {path: 'registration/:id', component: FootballCampRegistrationComponent},
  {path: 'login', component: FootballCampLoginComponent},
  {path: 'admin-dashboard', component: FootballCampAdminDashboardComponent},
  {path: 'print-registration', component: FootballCampPrintRegistrationComponent},
  {path: 'print-receipt', component: FootballCampPrintReceiptComponent},
  {path: 'print-equipment', component: FootballCampPrintEquipmentComponent},
  {path: 'playground', component: PlaygroundComponent},
];
