import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ObsUserService {
  activatedEmitter = new EventEmitter<boolean>();
  activateSubject = new Subject<boolean>();
}
