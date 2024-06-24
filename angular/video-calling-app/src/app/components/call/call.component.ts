import { Component, InputSignal, Signal, input } from '@angular/core';
import { Call, StreamVideoParticipant } from '@stream-io/video-client';
import { CallingService } from '../../services/calling.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ParticipantComponent } from '../participant/participant.component';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [CommonModule, ParticipantComponent],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss',
})
export class CallComponent {
  call: InputSignal<Call> = input();

  participants: Signal<StreamVideoParticipant[]>;

  constructor(private callingService: CallingService) {
    this.participants = toSignal(
      this.callingService.call()!.state.participants$,
      { requireSync: true }
    );
  }

  toggleMicrophone(): void {
    this.call().microphone.toggle();
  }

  toggleCamera(): void {
    this.call().camera.toggle();
  }

  trackBySessionId(_: number, participant: StreamVideoParticipant) {
    return participant.sessionId;
  }

  leaveCall(): void {
    this.callingService.setCallId(undefined);
  }
}
