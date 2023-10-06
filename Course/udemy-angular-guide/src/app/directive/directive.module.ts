import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectiveComponent } from './directive.component';
import { DirectiveRoutingModule } from './directive-routing.module';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless.directive';

@NgModule({
  declarations: [DirectiveComponent, BasicHighlightDirective, BetterHighlightDirective, UnlessDirective],
  imports: [CommonModule, DirectiveRoutingModule],
})
export class DirectiveModule {}
