import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  errorMessage: string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute) {
    // this.errorMessage = route.snapshot.data['message'];
    this.subscription = this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
