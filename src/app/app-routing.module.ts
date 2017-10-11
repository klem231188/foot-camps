import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FootballCampDetailsComponent} from './components/football-camp-details/football-camp-details.component';
import {FootballCampLocatorComponent} from './components/football-camp-locator/football-camp-locator.component';

const routes: Routes = [
  {path: '', redirectTo: '/locate', pathMatch: 'full'},
  {path: 'locate/:id/details', component: FootballCampDetailsComponent},
  {path: 'locate/:id', component: FootballCampLocatorComponent},
  {path: 'locate', component: FootballCampLocatorComponent},
  {path: 'details/:id', component: FootballCampDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
