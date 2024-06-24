import { Injectable, computed, signal } from '@angular/core';
import { Call, StreamVideoClient, User } from '@stream-io/video-client';

@Injectable({
  providedIn: 'root',
})
export class CallingService {
  callId = signal<string | undefined>(undefined);
  call = computed<Call | undefined>(() => {
    const currentCallId = this.callId();

    if (currentCallId === undefined) return undefined;

    const call = this.client.call('default', currentCallId);
    call.join({ create: true }).then(async () => {
      call.camera.enable();
      call.microphone.enable();
    });

    return call;
  });

  client: StreamVideoClient;

  constructor() {
    const apiKey = 'mmhfdzb5evj2';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTHVrZV9Ta3l3YWxrZXIiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0x1a2VfU2t5d2Fsa2VyIiwiaWF0IjoxNzE4ODYzMjk5LCJleHAiOjE3MTk0NjgxMDR9.TUVcgONePUhzJCZVkW_qH6n5fNtqeyFLyMOavvrP73k';
    const user: User = { id: 'Luke_Skywalker' };

    this.client = new StreamVideoClient({ apiKey, token, user });
  }

  setCallId(callId: string | undefined) {
    if (callId === undefined) this.call()?.leave();

    console.log(callId);
    this.callId.set(callId);
  }
}
