import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrx/store/counter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './ngrx/store/counter.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ counter: counterReducer }, {}),
    EffectsModule.forRoot([CounterEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
