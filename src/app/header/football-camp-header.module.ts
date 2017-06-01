import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppMaterialModule} from "../app.material.module";
import {FootballCampHeaderComponent} from "./football-camp-header.component";

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  declarations: [
    FootballCampHeaderComponent
  ],
  exports: [FootballCampHeaderComponent],
})
export class FootballCampHeaderModule {

}
