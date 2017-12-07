import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballCampDetailsComponent } from './components/football-camp-details/football-camp-details.component';
import { FootballCampLocatorComponent } from './components/football-camp-locator/football-camp-locator.component';
import { FootballCampRegistrationComponent } from 'app/components/football-camp-registration/football-camp-registration.component';
import { FootballCampLoginComponent } from './components/football-camp-login/football-camp-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/locate', pathMatch: 'full' },
  { path: 'locate/:id/details', component: FootballCampDetailsComponent },
  { path: 'locate/:id', component: FootballCampLocatorComponent },
  { path: 'locate', component: FootballCampLocatorComponent },
  { path: 'details/:id', component: FootballCampDetailsComponent },
  { path: 'registration', component: FootballCampRegistrationComponent },
  { path: 'login', component: FootballCampLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
