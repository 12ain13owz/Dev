import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss'],
})
export class ObservablesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  userActivated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.activatedEmitter.subscribe(
      (activated: boolean) => {
        this.userActivated = activated;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
