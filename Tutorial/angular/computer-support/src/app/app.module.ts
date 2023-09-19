import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { NavbarTopComponent } from './layouts/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from './layouts/navbar-bottom/navbar-bottom.component';
import { ProblemComponent } from './problem/problem.component';
import { MockDataService } from './services/mock.data.service';
import { NavbarService } from './services/navbar.service';
import { StorageService } from './services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmproblemComponent } from './confirmproblem/confirmproblem.component';
import { DetailproblemComponent } from './detailproblem/detailproblem.component';
import { LogproblemComponent } from './logproblem/logproblem.component';
import { TransferproblemComponent } from './transferproblem/transferproblem.component';
import { ReportComponent } from './report/report.component';
import { FixproblemComponent } from './fixproblem/fixproblem.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    HomeComponent,
    NavbarTopComponent,
    NavbarBottomComponent,
    ProblemComponent,
    ConfirmproblemComponent,
    DetailproblemComponent,
    LogproblemComponent,
    TransferproblemComponent,
    ReportComponent,
    FixproblemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MessageModule,
    TabMenuModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    TabViewModule,
    CardModule,
    FileUploadModule,
    HttpClientModule,
    BadgeModule,
    CalendarModule,
  ],
  providers: [MockDataService, NavbarService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
