import {Routes} from '@angular/router';
import {FootballCampDetailsComponent} from './components/football-camp-details/football-camp-details.component';
import {FootballCampLocatorComponent} from './components/football-camp-locator/football-camp-locator.component';
import {FootballCampRegistrationComponent} from 'app/components/football-camp-registration/football-camp-registration.component';
import {FootballCampLoginComponent} from './components/football-camp-login/football-camp-login.component';
import {PlaygroundComponent} from './components/playground/playground.component';
import {FootballCampAdminDashboardComponent} from './components/football-camp-admin-dashboard/football-camp-admin-dashboard.component';
import {FootballCampPrintRegistrationComponent} from './components/football-camp-print-registration/football-camp-print-registration.component';
import {FootballCampHomeComponent} from './components/football-camp-home/football-camp-home.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: FootballCampHomeComponent},
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
