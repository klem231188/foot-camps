import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FootballCampMapComponent} from "./football-camp-map.component";
import {AppMaterialModule} from "../app.material.module";
import {AgmCoreModule} from "angular2-google-maps/core";

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    AgmCoreModule.forRoot({}),
  ],
  declarations: [
    FootballCampMapComponent
  ],
  exports: [FootballCampMapComponent]
})
export class FootballCampMapModule {

}
