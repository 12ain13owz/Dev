import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './pages/login/login.component';

import { UserComponent } from './user.component';
import {
  NavbarComponent,
  NewItemDialog,
} from './layouts/navbar/navbar.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { AuthInterceptorProviders } from './shared/auth.interceptor';
import { AuthService } from './shared/service/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { ScanComponent } from './components/scan/scan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  EditItemDialog,
  ItemComponent,
} from './components/item/item.component';
import { environment } from 'src/environments/environment';
import { TokenService } from './shared/service/token.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpService } from './shared/service/http.service';
import { ProgressBarComponent } from './layouts/progress-bar/progress-bar.component';
import { StockComponent } from './components/stock/stock.component';
import { FocusDirective } from './shared/directive/focus.directive';
import { FormService } from './shared/service/form.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LogComponent } from './components/log/log.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { SettingComponent } from './components/setting/setting.component';
import {
  AccountComponent,
  EditAccountDialog,
} from './components/setting/components/account/account.component';
import {
  EditStatusDialog,
  StatusComponent,
} from './components/setting/components/status/status.component';
import {
  CategoryComponent,
  EditCategoryDialog,
} from './components/setting/components/category/category.component';
import { AdminGuard } from './shared/admin.guard';
import { RolePipe } from './shared/pipe/role.pipe';
import { SearchPipe } from './shared/pipe/search.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchComponent } from './components/search/search.component';

export function tokenGetter() {
  return localStorage.getItem('auth-token');
}

export const allowedDomains = [
  environment.localhost,
  'https://bsru-parcel-demo.herokuapp.com',
];

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    NavbarComponent,
    SidenavComponent,
    DashboardComponent,
    ScanComponent,
    ItemComponent,
    EditItemDialog,
    NotFoundComponent,
    NewItemDialog,
    ProgressBarComponent,
    StockComponent,
    FocusDirective,
    LogComponent,
    SettingComponent,
    AccountComponent,
    StatusComponent,
    CategoryComponent,
    EditCategoryDialog,
    EditStatusDialog,
    EditAccountDialog,
    RolePipe,
    SearchPipe,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxDropzoneModule,
    NgxSkeletonLoaderModule,
    LazyLoadImageModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: allowedDomains,
      },
    }),
  ],
  exports: [FormsModule, ReactiveFormsModule],

  providers: [
    AuthInterceptorProviders,
    AuthService,
    TokenService,
    AuthGuard,
    AdminGuard,
    HttpService,
    FormService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'TH' },
  ],
})
export class UserModule {}
