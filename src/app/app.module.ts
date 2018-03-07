import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app.material.module';
import {AgmCoreModule} from '@agm/core';
import {FootballCampLocatorComponent} from './components/football-camp-locator/football-camp-locator.component';
import {FootballCampHeaderComponent} from './components/football-camp-header/football-camp-header.component';
import {FootballCampDetailsComponent} from './components/football-camp-details/football-camp-details.component';
import {FootballCampMapComponent} from './components/football-camp-map/football-camp-map.component';
import {FootballCampOverviewComponent} from './components/football-camp-overview/football-camp-overview.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {Angular2ImageGalleryModule} from './components/angular2-image-gallery';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {SafeHtmlPipe} from './pipes/safe-html-pipe';
import {TruncatePipe} from './pipes/truncate-pipe';
import {AgePipe} from './pipes/age';
import {FootballCampRegistrationComponent} from './components/football-camp-registration/football-camp-registration.component';
import {AngularFireAuth} from 'angularfire2/auth';
import {FootballCampLoginComponent} from './components/football-camp-login/football-camp-login.component';
import {FootballCampShouldConnectDialogComponent} from './components/football-camp-should-connect-dialog/football-camp-should-connect-dialog.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FootballCampRegistrationsViewerComponent} from './components/football-camp-registrations-viewer/football-camp-registrations-viewer.component';


registerLocaleData(localeFr, 'fr');

@NgModule({
  imports: [
    // @Angular
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
    AgePipe,
    SafeHtmlPipe,
    TruncatePipe,
    AppComponent,
    FootballCampLocatorComponent,
    FootballCampMapComponent,
    FootballCampOverviewComponent,
    FootballCampDetailsComponent,
    FootballCampHeaderComponent,
    FootballCampRegistrationComponent,
    FootballCampRegistrationsViewerComponent,
    FootballCampLoginComponent,
    FootballCampShouldConnectDialogComponent,
  ],
  entryComponents: [
    FootballCampLoginComponent,
    FootballCampShouldConnectDialogComponent
  ],
  providers: [
    AngularFireAuth,
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
