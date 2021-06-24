import {NgModule} from '@angular/core';

import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {SharedModule} from '../../shared/shared.module';
import {StepSessionsComponent} from './components/step-sessions/step-sessions.component';
import {StepTraineeFormComponent} from './components/step-trainee-form/step-trainee-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@NgModule({
  declarations: [
    RegistrationComponent,
    StepSessionsComponent,
    StepTraineeFormComponent
  ],
  imports: [
    SharedModule,
    RegistrationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class RegistrationModule {
}
