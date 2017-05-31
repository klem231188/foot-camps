import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FootballCampOverviewComponent} from "./football-camp-overview.component";
import {AppMaterialModule} from "../app.material.module";

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  declarations: [
    FootballCampOverviewComponent
  ],
  exports: [FootballCampOverviewComponent],
})
export class FootballCampOverviewModule {

}
