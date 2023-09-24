import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnivarsalComponent } from './univarsal.component';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UnivarsalRoutingModule } from './univarsal-routing.module';

@NgModule({
  declarations: [UnivarsalComponent, AboutComponent, WelcomeComponent],
  imports: [CommonModule, UnivarsalRoutingModule],
})
export class UnivarsalModule {}
