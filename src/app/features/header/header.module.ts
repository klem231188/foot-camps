import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {SharedModule} from '../../shared/shared.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class HeaderModule {
}
