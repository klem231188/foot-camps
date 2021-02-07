import {BrowserModule, HammerModule, Title} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {AppRoutes} from './app-routes';
import {AppMaterialModule} from './app.material.module';
import {AgmCoreModule} from '@agm/core';
import {FootballCampLocatorComponent} from './components/football-camp-locator/football-camp-locator.component';
import {FootballCampHeaderComponent} from './components/football-camp-header/football-camp-header.component';
import {FootballCampDetailsComponent} from './components/football-camp-details/football-camp-details.component';
import {FootballCampMapComponent} from './components/football-camp-map/football-camp-map.component';
import {FootballCampOverviewComponent} from './components/football-camp-overview/football-camp-overview.component';
import {Angular2ImageGalleryModule} from './components/angular2-image-gallery';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AgePipe} from './pipes/age.pipe';
import {FieldPositionPipe} from './pipes/fieldPosition.pipe';
import {FeetPipe} from './pipes/feet.pipe';
import {GenderPipe} from './pipes/gender.pipe';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {TruncatePipe} from './pipes/truncate.pipe';
import {FootballCampRegistrationComponent} from './components/football-camp-registration/football-camp-registration.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {FootballCampLoginComponent} from './components/football-camp-login/football-camp-login.component';
import {FootballCampShouldConnectDialogComponent} from './components/football-camp-should-connect-dialog/football-camp-should-connect-dialog.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {StatePipe} from './pipes/state.pipe';
import {PlaygroundComponent} from './components/playground/playground.component';
import {FootballCampFileUploadComponent} from './components/football-camp-file-upload/football-camp-file-upload.component';
import {FileSizePipe} from './pipes/file-size.pipe';
import {FootballCampRegistrationDocumentsComponent} from './components/football-camp-registration-documents/football-camp-registration-documents.component';
import {FootballCampRegistrationSessionsComponent} from './components/football-camp-registration-sessions/football-camp-registration-sessions.component';
import {FootballCampRegistrationTraineeFormComponent} from './components/football-camp-registration-trainee-form/football-camp-registration-trainee-form.component';
import {FootballCampRegistrationCheckPaymentComponent} from './components/football-camp-registration-check-payment/football-camp-registration-check-payment.component';
import {RouterModule} from '@angular/router';
import {TableOfContentsModule} from './components/table-of-contents/table-of-contents.module';
import {FootballCampRegistrationsOverviewComponent} from './components/football-camp-registrations-overview/football-camp-registrations-overview.component';
import {HttpClientModule} from '@angular/common/http';
import {FootballCampAdminDashboardComponent} from './components/football-camp-admin-dashboard/football-camp-admin-dashboard.component';
import {FootballCampSessionOverviewComponent} from './components/football-camp-admin-dashboard/football-camp-session-overview/football-camp-session-overview.component';
import {PaymentTypePipe} from './pipes/payment-type.pipe';
import {FootballCampPrintRegistrationComponent} from './components/football-camp-print-registration/football-camp-print-registration.component';
import {FootballCampHomeComponent} from './components/football-camp-home/football-camp-home.component';
import {MatCarouselModule} from '@ngbmodule/material-carousel';
import {FootballCampAdminDashboardRegistrationTableComponent} from './components/football-camp-admin-dashboard/football-camp-admin-dashboard-registration-table/football-camp-admin-dashboard-registration-table.component';
import {FootballCampAdminDashboardRegistrationDetailsComponent} from './components/football-camp-admin-dashboard/football-camp-admin-dashboard-registration-details/football-camp-admin-dashboard-registration-details.component';
import {PaymentStatePipe} from './pipes/payment-state.pipe';
import {FootballCampDetailsV2Component} from './components/football-camp-details-v2/football-camp-details-v2.component';
import {FootballCampBadgesComponent} from './components/football-camp-badges/football-camp-badges.component';
import {FootballCampActionButtonComponent} from './components/football-camp-action-button/football-camp-action-button.component';
import {FootballCampRegistrationV2Component} from './components/football-camp-registration-v2/football-camp-registration-v2.component';
import {FootballCampBadgeComponent} from './components/football-camp-badge/football-camp-badge.component';
import {FootballCampPrintEquipmentComponent} from './components/football-camp-print-equipment/football-camp-print-equipment.component';
import {FootballCampPrintReceiptComponent} from './components/football-camp-print-receipt/football-camp-print-receipt.component';
import {FootballCampPrintRegistrationsComponent} from './components/football-camp-print-registrations/football-camp-print-registrations.component';
import {FootballCampRegistrationCardPaymentComponent} from './components/football-camp-registration-card-payment/football-camp-registration-card-payment.component';
import {FootballCampRegistrationPaymentComponent} from './components/football-camp-registration-payment/football-camp-registration-payment.component';
import {FootballCampRegistrationPaymentModeComponent} from './components/football-camp-registration-payment-mode/football-camp-registration-payment-mode.component';
import {PaymentModePipe} from './pipes/payment-mode.pipe';
import {FootballCampRegistrationPaymentModeInPersonComponent} from './components/football-camp-registration-payment-mode-in-person/football-camp-registration-payment-mode-in-person.component';
import {FootballCampRegistrationPaymentModeByMailComponent} from './components/football-camp-registration-payment-mode-by-mail/football-camp-registration-payment-mode-by-mail.component';
import {FootballCampRegistrationPaymentModeOnlineComponent} from './components/football-camp-registration-payment-mode-online/football-camp-registration-payment-mode-online.component';
import {NgxStripeModule} from 'ngx-stripe';

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
    // @MaterialDesign
    AppMaterialModule,
    MatCarouselModule,
    // ImageGallery
    Angular2ImageGalleryModule,
    TableOfContentsModule,
    // @GoogleMaps
    AgmCoreModule.forRoot({
      apiKey: environment.googlemaps.apiKey
    }),
    // @Routing
    RouterModule.forRoot(AppRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    HammerModule
  ],
  declarations: [
    AgePipe,
    FieldPositionPipe,
    FileSizePipe,
    FeetPipe,
    GenderPipe,
    SafeHtmlPipe,
    PaymentModePipe,
    PaymentTypePipe,
    PaymentStatePipe,
    StatePipe,
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
    PlaygroundComponent,
    FootballCampFileUploadComponent,
    FootballCampRegistrationDocumentsComponent,
    FootballCampRegistrationSessionsComponent,
    FootballCampRegistrationTraineeFormComponent,
    FootballCampRegistrationCheckPaymentComponent,
    FootballCampRegistrationsOverviewComponent,
    FootballCampAdminDashboardComponent,
    FootballCampSessionOverviewComponent,
    FootballCampPrintRegistrationComponent,
    FootballCampHomeComponent,
    FootballCampAdminDashboardRegistrationTableComponent,
    FootballCampAdminDashboardRegistrationDetailsComponent,
    FootballCampDetailsV2Component,
    FootballCampBadgesComponent,
    FootballCampActionButtonComponent,
    FootballCampRegistrationV2Component,
    FootballCampBadgeComponent,
    FootballCampPrintEquipmentComponent,
    FootballCampPrintReceiptComponent,
    FootballCampPrintRegistrationsComponent,
    FootballCampRegistrationCardPaymentComponent,
    FootballCampRegistrationPaymentComponent,
    FootballCampRegistrationPaymentModeComponent,
    FootballCampRegistrationPaymentModeInPersonComponent,
    FootballCampRegistrationPaymentModeByMailComponent,
    FootballCampRegistrationPaymentModeOnlineComponent
  ],
  entryComponents: [
    FootballCampLoginComponent,
    FootballCampShouldConnectDialogComponent
  ],
  providers: [
    Title,
    AngularFireAuth,
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
