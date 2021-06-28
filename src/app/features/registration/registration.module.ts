import {NgModule} from '@angular/core';

import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {SharedModule} from '../../shared/shared.module';
import {StepSessionsComponent} from './components/step-sessions/step-sessions.component';
import {StepTraineeFormComponent} from './components/step-trainee-form/step-trainee-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {StepDocumentsComponent} from './components/step-documents/step-documents.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {StepPaymentComponent} from './components/step-payment/step-payment.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    StepSessionsComponent,
    StepTraineeFormComponent,
    StepDocumentsComponent,
    StepPaymentComponent
  ],
  imports: [
    SharedModule,
    RegistrationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
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
