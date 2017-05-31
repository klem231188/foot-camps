import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdToolbarModule, MdSlideToggleModule, MdIconModule, MdButtonModule, MaterialModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {AgmCoreModule} from "angular2-google-maps/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import "hammerjs";
import {FootballCampOverviewModule} from "./football-camp-overview/football-camp-overview.module";
import {AppMaterialModule} from "./app.material.module";
import {FootballCampMapModule} from "./football-camp-map/football-camp-map.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,

    // Material Design
    AppMaterialModule,

    // My Module
    FootballCampOverviewModule,
    FootballCampMapModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
