import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FootballCampOverviewComponent} from "./football-camp-overview.component";
import {MdCardModule, MdButtonModule, MdIconModule, MaterialModule} from "@angular/material";
import {AppMaterialModule} from "../app.material.module";

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    // MdCardModule,
    // MdButtonModule,
    // MdIconModule
  ],
  declarations: [
    FootballCampOverviewComponent
  ],
  exports: [FootballCampOverviewComponent]
})
export class FootballCampOverviewModule {

}
