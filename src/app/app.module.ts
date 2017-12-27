import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app.material.module';
import { AgmCoreModule } from '@agm/core';
import { FootballCampLocatorComponent } from './components/football-camp-locator/football-camp-locator.component';
import { FootballCampHeaderComponent } from './components/football-camp-header/football-camp-header.component';
import { FootballCampDetailsComponent } from './components/football-camp-details/football-camp-details.component';
import { FootballCampMapComponent } from './components/football-camp-map/football-camp-map.component';
import { FootballCampOverviewComponent } from './components/football-camp-overview/football-camp-overview.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { Angular2ImageGalleryModule } from './components/angular2-image-gallery';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { SafeHtmlPipe } from './pipes/safe-html-pipe';
import { TruncatePipe } from './pipes/truncate-pipe';
import { FootballCampRegistrationComponent } from './components/football-camp-registration/football-camp-registration.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { FootballCampLoginComponent } from './components/football-camp-login/football-camp-login.component';
import { FootballCampShouldConnectDialogComponent } from './components/football-camp-should-connect-dialog/football-camp-should-connect-dialog.component';

@NgModule({
  imports: [
    // @Angular
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    // @MaterialDesign
    AppMaterialModule,
    // ImageGallery
    Angular2ImageGalleryModule,
    // @Bootstrap
    CarouselModule.forRoot(),
    // @GoogleMaps
    AgmCoreModule.forRoot({
      apiKey: environment.googlemaps.apiKey
    }),
    // @Routing
    AppRoutingModule
  ],
  declarations: [
    SafeHtmlPipe,
    TruncatePipe,
    AppComponent,
    FootballCampLocatorComponent,
    FootballCampMapComponent,
    FootballCampOverviewComponent,
    FootballCampDetailsComponent,
    FootballCampHeaderComponent,
    FootballCampRegistrationComponent,
    FootballCampLoginComponent,
    FootballCampShouldConnectDialogComponent,
  ],
  entryComponents: [
    FootballCampLoginComponent,
    FootballCampShouldConnectDialogComponent
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}
