import { Component, ElementRef, Signal, input, viewChild } from '@angular/core';
import { StreamVideoParticipant } from '@stream-io/video-client';
import { CallingService } from '../../services/calling.service';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.scss',
})
export class ParticipantComponent {
  videoElement: Signal<ElementRef<HTMLVideoElement>> =
    viewChild('videoElement');
  audioElement: Signal<ElementRef<HTMLAudioElement>> =
    viewChild('audioElement');
  participant: Signal<StreamVideoParticipant> = input();

  unbindVideoElement: (() => void) | undefined;
  unbindAudioElement: (() => void) | undefined;

  constructor(private callingService: CallingService) {}

  ngAfterViewInit(): void {
    this.unbindVideoElement = this.callingService
      .call()
      ?.bindVideoElement(
        this.videoElement().nativeElement,
        this.participant().sessionId,
        'videoTrack'
      );

    this.unbindAudioElement = this.callingService
      ?.call()
      ?.bindAudioElement(
        this.audioElement().nativeElement,
        this.participant().sessionId,
        'audioTrack'
      );
  }

  ngOnDestroy(): void {
    this.unbindVideoElement?.();
    this.unbindAudioElement?.();
  }
}
