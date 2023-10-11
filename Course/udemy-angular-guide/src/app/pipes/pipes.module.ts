import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesComponent } from './pipes.component';
import { PipesRoutingModule } from './pipes-routing.module';
import { ShortenPipe } from './shorten.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { PracticePipesComponent } from './practice-pipes/practice-pipes.component';
import { SortPipe } from './practice-pipes/sort.pipe';
import { ReversePipe } from './practice-pipes/reverse.pipe';

@NgModule({
  declarations: [PipesComponent, ShortenPipe, FilterPipe, PracticePipesComponent, SortPipe, ReversePipe],
  imports: [CommonModule, PipesRoutingModule, FormsModule],
})
export class PipesModule {}
