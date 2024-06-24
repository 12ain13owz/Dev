import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CallingService } from './services/calling.service';
import { CommonModule } from '@angular/common';
import { CallComponent } from './components/call/call.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CallComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  callingService: CallingService;

  constructor(callingService: CallingService) {
    this.callingService = callingService;
  }

  setCallId(callId: string) {
    this.callingService.setCallId(callId);
  }
}
