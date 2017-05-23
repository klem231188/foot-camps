import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdToolbarModule, MdSlideToggleModule, MdIconModule, MdButtonModule} from '@angular/material';
import {AppComponent} from './app.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,

    AgmCoreModule.forRoot({
    }),

    // Material Design
    MdButtonModule,
    MdIconModule,
    MdSlideToggleModule,
    MdToolbarModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
