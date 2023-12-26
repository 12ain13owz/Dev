import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [CommonModule, MaterialModule, HttpClientModule],
})
export class CoreModule {}
