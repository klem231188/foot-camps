import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FootballCampDetailsComponent} from "./football-camp-details/football-camp-details.component";
import {FootballCampLocatorComponent} from "./football-camp-locator/football-camp-locator.component";

const routes: Routes = [
  {path: '', redirectTo: '/locate-camp', pathMatch: 'full'},
  {path: 'locate-camp', component: FootballCampLocatorComponent},
  {path: 'details/:id', component: FootballCampDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
