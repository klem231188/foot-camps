import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../app.material.module';
import {AgePipe} from './pipes/age.pipe';
import {FieldPositionPipe} from './pipes/fieldPosition.pipe';
import {FileSizePipe} from './pipes/file-size.pipe';
import {FeetPipe} from './pipes/feet.pipe';
import {GenderPipe} from './pipes/gender.pipe';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {PaymentModePipe} from './pipes/payment-mode.pipe';
import {PaymentTypePipe} from './pipes/payment-type.pipe';
import {PaymentStatePipe} from './pipes/payment-state.pipe';
import {StatePipe} from './pipes/state.pipe';
import {TruncatePipe} from './pipes/truncate.pipe';
import {RegistrationsGridComponent} from './components/registrations-grid/registrations-grid.component';
import {FileUploadComponent} from './components/file-upload/file-upload.component';

@NgModule({
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
    RegistrationsGridComponent,
    FileUploadComponent
  ],
  exports: [
    CommonModule,
    AppMaterialModule,
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
    RegistrationsGridComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class SharedModule {
}
