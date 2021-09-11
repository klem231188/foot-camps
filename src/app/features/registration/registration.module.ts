import {NgModule} from '@angular/core';

import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {SharedModule} from '../../shared/shared.module';
import {StepSessionsComponent} from './components/step-sessions/step-sessions.component';
import {StepTraineeFormComponent} from './components/step-trainee-form/step-trainee-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {StepDocumentsComponent} from './components/step-documents/step-documents.component';
import {StepPaymentComponent} from './components/step-payment/step-payment.component';
import {PaymentModeInPersonComponent} from './components/step-payment/components/payment-mode-in-person/payment-mode-in-person.component';
import {PaymentModeOnlineComponent} from './components/step-payment/components/payment-mode-online/payment-mode-online.component';
import {NgxStripeModule} from 'ngx-stripe';

@NgModule({
  declarations: [
    RegistrationComponent,
    StepSessionsComponent,
    StepTraineeFormComponent,
    StepDocumentsComponent,
    StepPaymentComponent,
    PaymentModeInPersonComponent,
    PaymentModeOnlineComponent
  ],
  imports: [
    SharedModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStripeModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class RegistrationModule {
}
