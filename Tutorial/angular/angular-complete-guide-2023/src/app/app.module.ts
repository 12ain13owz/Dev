import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './practice/server/server.component';
import { WarningAlertComponent } from './practice/warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './practice/success-alert/success-alert.component';
import { ServersComponent } from './practice/servers/servers.component';
import { PracticingDirectivesComponent } from './practice/practicing-directives/practicing-directives.component';
import { HeaderComponent } from './shopping/header/header.component';

import { CockpitComponent } from './practice/cockpit/cockpit.component';
import { ServerElementComponent } from './practice/server-element/server-element.component';
import { GameControlComponent } from './practice-lesson-5/game-control/game-control.component';
import { OddComponent } from './practice-lesson-5/odd/odd.component';
import { EvenComponent } from './practice-lesson-5/even/even.component';
import { DirectivesDeepDiveComponent } from './directives-deep-dive/directives-deep-dive.component';
import { BasicHighlightDirective } from './directives-deep-dive/basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './directives-deep-dive/ิbetter-highlight/better-highlight.directive';
import { UnlessDirective } from './directives-deep-dive/unless.directive';
import { AccountComponent } from './using-services/account/account.component';
import { NewAccountComponent } from './using-services/new-account/new-account.component';
import { LoggingService } from './using-services/logging.service';
import { AccountService } from './using-services/account.service';
import { ActiveUserComponent } from './practice-lesson-9/active-user/active-user.component';
import { InactiveUserComponent } from './practice-lesson-9/inactive-user/inactive-user.component';
import { UserService } from './practice-lesson-9/user.service';
import { CounterService } from './practice-lesson-9/counter.service';
import { HomeComponent } from './routes/home/home.component';
import { UsersComponent } from './routes/users/users.component';
import { Servers2Component } from './routes/servers2/servers2.component';
import { Server2Component } from './routes/servers2/server2/server2.component';
import { EditServer2Component } from './routes/servers2/edit-server2/edit-server2.component';
import { UserComponent } from './routes/users/user/user.component';
import { Servers2Service } from './routes/servers2/servers2.service';
import { PageNotFoundComponent } from './routes/servers2/page-not-found/page-not-found.component';
import { AuthService } from './routes/auth.service';
import { AuthGuard } from './routes/auth-guard.service';
import { CanDeactivateGuard } from './routes/servers2/edit-server2/can-deactivate-guard.service';
import { ErrorPageComponent } from './routes/error-page/error-page.component';
import { Server2Resolver } from './routes/servers2/server2/server2-resolver.service';
import { ObservableHomeComponent } from './observables/observable-home/observable-home.component';
import { ObservableUserComponent } from './observables/observable-user/observable-user.component';
import { ObsUserService } from './observables/obs-user.service';
import { FirstFormComponent } from './form/first-form/first-form.component';
import { PracticeFormComponent } from './form/practice-form/practice-form.component';
import { SecondFormComponent } from './form/second-form/second-form.component';
import { FormPracticeComponent } from './practice-lesson-15/form-practice/form-practice.component';
import { FirstPipesComponent } from './pipes/first-pipes/first-pipes.component';
import { ShortenPipe } from './pipes/first-pipes/shorten.pipe';
import { FilterPipe } from './pipes/first-pipes/filter.pipe';
import { PipePracticeComponent } from './practice-lesson-17/pipe-practice/pipe-practice.component';
import { ReversePipe } from './practice-lesson-17/reverse.pipe';
import { SortPipe } from './practice-lesson-17/sort.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shopping/shared/shared.module';
import { CoreModule } from './core.module';
import { RecipesModule } from './shopping/recipes/recipes.module';
import { LoggingService2 } from './logging.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { shoppingListReducer } from './shopping/shopping-list/store/shopping-list.reducer';
// import { authReducer } from './shopping/auth/store/auth.reducer';

import * as fromApp from './store/app.reducer';
import { AuthEffects } from './shopping/auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipeEffects } from './shopping/recipes/store/recipe.effects';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    ServersComponent,
    PracticingDirectivesComponent,
    HeaderComponent,
    CockpitComponent,
    ServerElementComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    DirectivesDeepDiveComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    AccountComponent,
    NewAccountComponent,
    ActiveUserComponent,
    InactiveUserComponent,
    HomeComponent,
    UsersComponent,
    Servers2Component,
    Server2Component,
    EditServer2Component,
    UserComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    ObservableHomeComponent,
    ObservableUserComponent,
    FirstFormComponent,
    PracticeFormComponent,
    SecondFormComponent,
    FormPracticeComponent,
    FirstPipesComponent,
    ShortenPipe,
    FilterPipe,
    PipePracticeComponent,
    ReversePipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    AccountService,
    UserService,
    CounterService,
    Servers2Service,
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    Server2Resolver,
    ObsUserService,
    LoggingService,
    LoggingService2,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
