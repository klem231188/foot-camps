import {NgModule} from '@angular/core';

import {PlaygroundRoutingModule} from './playground-routing.module';
import {PlaygroundComponent} from './playground.component';
import {SharedModule} from '../../shared/shared.module';
import {RegistrationModule} from '../registration/registration.module';


@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    SharedModule,
    PlaygroundRoutingModule,
    RegistrationModule
  ]
})
export class PlaygroundModule {
}
