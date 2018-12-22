import {Routes} from '@angular/router';
import {FootballCampDetailsComponent} from './components/football-camp-details/football-camp-details.component';
import {FootballCampLocatorComponent} from './components/football-camp-locator/football-camp-locator.component';
import {FootballCampRegistrationComponent} from 'app/components/football-camp-registration/football-camp-registration.component';
import {FootballCampLoginComponent} from './components/football-camp-login/football-camp-login.component';
import {FootballCampRegistrationsViewerComponent} from './components/football-camp-registrations-viewer/football-camp-registrations-viewer.component';
import {PlaygroundComponent} from './components/playground/playground.component';
import {FootballCampAdminDashboardComponent} from './components/football-camp-admin-dashboard/football-camp-admin-dashboard.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: '/locate', pathMatch: 'full'},
  {path: 'locate/:id/details', component: FootballCampDetailsComponent},
  {path: 'locate/:id', component: FootballCampLocatorComponent},
  {path: 'locate', component: FootballCampLocatorComponent},
  {path: 'details/:id', component: FootballCampDetailsComponent},
  {path: 'registration/:id', component: FootballCampRegistrationComponent},
  {path: 'login', component: FootballCampLoginComponent},
  {path: 'view-registrations', component: FootballCampRegistrationsViewerComponent},
  {path: 'admin-dashboard', component: FootballCampAdminDashboardComponent},
  {path: 'playground', component: PlaygroundComponent},
];
