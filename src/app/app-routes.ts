import {Routes} from '@angular/router';
import {FootballCampDetailsComponent} from './components/football-camp-details/football-camp-details.component';
import {FootballCampLocatorComponent} from './components/football-camp-locator/football-camp-locator.component';
import {FootballCampRegistrationComponent} from 'app/components/football-camp-registration/football-camp-registration.component';
import {FootballCampLoginComponent} from './components/football-camp-login/football-camp-login.component';
import {PlaygroundComponent} from './components/playground/playground.component';
import {FootballCampAdminDashboardComponent} from './components/football-camp-admin-dashboard/football-camp-admin-dashboard.component';
import {FootballCampPrintRegistrationComponent} from './components/football-camp-print-registration/football-camp-print-registration.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: '/locate', pathMatch: 'full'},
  {path: 'locate/:id/details', component: FootballCampDetailsComponent},
  {path: 'locate/:id', component: FootballCampLocatorComponent},
  {path: 'locate', component: FootballCampLocatorComponent},
  {path: 'details/:id', component: FootballCampDetailsComponent},
  {path: 'registration/:id', component: FootballCampRegistrationComponent},
  {path: 'login', component: FootballCampLoginComponent},
  {path: 'admin-dashboard', component: FootballCampAdminDashboardComponent},
  {path: 'print-registration', component: FootballCampPrintRegistrationComponent},
  {path: 'playground', component: PlaygroundComponent},
];
