import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { StandAloneRoutingModule } from './stand-alone-routing.module';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [WelcomeComponent, RouterModule],
  selector: 'app-stand-alone',
  templateUrl: './stand-alone.component.html',
  styleUrls: ['./stand-alone.component.scss'],
})
export class StandAloneComponent {}
