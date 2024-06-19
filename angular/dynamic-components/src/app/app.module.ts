import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentDirective } from './content.directive';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [AppComponent, ContentDirective, ContentComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
