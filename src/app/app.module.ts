import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import "hammerjs";
import {AppRoutingModule} from "./app-routing.module";
import {AppMaterialModule} from "./app.material.module";
import {AgmCoreModule} from "angular2-google-maps/core";
import {FootballCampLocatorComponent} from "./components/football-camp-locator/football-camp-locator.component";
import {FootballCampHeaderComponent} from "./components/football-camp-header/football-camp-header.component";
import {FootballCampDetailsComponent} from "./components/football-camp-details/football-camp-details.component";
import {FootballCampMapComponent} from "./components/football-camp-map/football-camp-map.component";
import {FootballCampOverviewComponent} from "./components/football-camp-overview/football-camp-overview.component";
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {Angular2ImageGalleryModule} from 'angular2-image-gallery';

@NgModule({
  imports: [
    // @Angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    // @MaterialDesign
    AppMaterialModule,
    // ImageGallery
    Angular2ImageGalleryModule,
    // @Bootstrap
    CarouselModule.forRoot(),
    // @GoogleMaps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMLCtOUXk0d4w6GDtPOMujTMU6zeV_YVA'
    }),
    // @Routing
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FootballCampLocatorComponent,
    FootballCampMapComponent,
    FootballCampOverviewComponent,
    FootballCampDetailsComponent,
    FootballCampHeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
