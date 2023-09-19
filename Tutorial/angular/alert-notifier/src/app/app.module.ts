import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotifierModule, NotifierOptions } from "angular-notifier";

const customNotifier: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 10
    }
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NotifierModule.withConfig(customNotifier)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
