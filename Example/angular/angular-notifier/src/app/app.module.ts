import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NotifierModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
