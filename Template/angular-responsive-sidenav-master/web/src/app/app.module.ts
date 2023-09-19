import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Angular Material Framework
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatListModule, 
  MatGridListModule, MatMenuModule, MatDialogModule, MatExpansionModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import 'hammerjs';

//Layout
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
