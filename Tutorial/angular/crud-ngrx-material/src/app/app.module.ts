import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './core/material.module';
import { AppComponent } from './app.component';
import { AssociatelistingComponent } from './components/associatelisting/associatelisting.component';
import { AddassociateComponent } from './components/addassociate/addassociate.component';
import { AssociateReducer } from './store/associate/associate.reducer';
import { AssociateEffects } from './store/associate/associate.effects';
import { AppEffects } from './store/common/app.effects';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    AssociatelistingComponent,
    AddassociateComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ associate: AssociateReducer }, {}),
    EffectsModule.forRoot([AssociateEffects, AppEffects]),
    // StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
