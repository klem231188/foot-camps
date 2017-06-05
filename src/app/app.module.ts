import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import "hammerjs";
import {FootballCampOverviewModule} from "./football-camp-overview/football-camp-overview.module";
import {AppMaterialModule} from "./app.material.module";
import {FootballCampMapModule} from "./football-camp-map/football-camp-map.module";
import {FootballCampHeaderComponent} from "./header/football-camp-header.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,

    // Material Design
    AppMaterialModule,

    // FootballCampModules
    // FootballCampHeaderModule,
    FootballCampOverviewModule,
    FootballCampMapModule
  ],
  declarations: [
    AppComponent,
    FootballCampHeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
