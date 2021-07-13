import {NgModule} from '@angular/core';

import {PlaygroundRoutingModule} from './playground-routing.module';
import {PlaygroundComponent} from './playground.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    SharedModule,
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule {
}
