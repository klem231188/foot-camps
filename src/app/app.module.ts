import {BrowserModule, HammerModule, Title} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {AgmCoreModule} from '@agm/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {PlaygroundComponent} from './components/playground/playground.component';
import {HttpClientModule} from '@angular/common/http';
import {FootballCampPrintRegistrationComponent} from './components/football-camp-print-registration/football-camp-print-registration.component';
import {MatCarouselModule} from '@ngbmodule/material-carousel';
import {FootballCampPrintEquipmentComponent} from './components/football-camp-print-equipment/football-camp-print-equipment.component';
import {FootballCampPrintReceiptComponent} from './components/football-camp-print-receipt/football-camp-print-receipt.component';
import {FootballCampPrintRegistrationsComponent} from './components/football-camp-print-registrations/football-camp-print-registrations.component';
import {NgxStripeModule} from 'ngx-stripe';
import {AppRoutingModule} from './app-routing.module';
import {HeaderModule} from './features/header/header.module';
import {SharedModule} from './shared/shared.module';
import {ImageGalleryModule} from './shared/components/image-gallery';

registerLocaleData(localeFr, 'fr');

@NgModule({
  imports: [
    // @Angular
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    // Stripe
    NgxStripeModule.forRoot(environment.stripe.publicKey),
    SharedModule,
    MatCarouselModule,
    // @GoogleMaps
    AgmCoreModule.forRoot({
      apiKey: environment.googlemaps.apiKey
    }),
    AppRoutingModule,
    HammerModule,
    HeaderModule,
    ImageGalleryModule
  ],
  declarations: [
    AppComponent,
    PlaygroundComponent,
    FootballCampPrintRegistrationComponent,
    FootballCampPrintEquipmentComponent,
    FootballCampPrintReceiptComponent,
    FootballCampPrintRegistrationsComponent,
  ],
  entryComponents: [],
  providers: [
    Title,
    AngularFireAuth,
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
