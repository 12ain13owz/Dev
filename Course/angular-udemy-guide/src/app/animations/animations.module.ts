import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationsComponent } from './animations.component';
import { AnimationsRoutingModule } from './animations-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnimationsComponent],
  imports: [CommonModule, AnimationsRoutingModule, FormsModule],
})
export class AnimationsModule {}
