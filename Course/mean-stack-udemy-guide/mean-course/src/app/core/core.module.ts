import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatToolbarModule,
  ],
})
export class CoreModule {}
