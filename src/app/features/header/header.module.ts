import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
  ]
})
export class HeaderModule {
}
