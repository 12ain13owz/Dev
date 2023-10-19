import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  filter,
  finalize,
  interval,
  map,
  Observable,
  Observer,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  ngOnInit(): void {
    // this.subscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    // old
    // const customIntervalObservable: Observable<number> = Observable.create(
    //   (observer: Observer<number>) => {
    //     let count = 0;
    //     setInterval(() => {
    //       observer.next(count);
    //       count++;
    //     }, 1000);
    //   }
    // );

    // new
    const customIntervalObservable = new Observable((subscriber) => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count);
        if (count === 5) subscriber.complete();
        if (count > 3) subscriber.error('Count is greater 3!');
        count++;
      }, 1000);
    });

    // old
    // this.subscription = customIntervalObservable.subscribe(
    //   (count) => console.log(count),
    //   (error) => console.error(error),
    //   () => console.log('complete')
    // );

    // new
    this.subscription = customIntervalObservable
      .pipe(
        filter((data: number) => data % 2 == 0),
        map((data: number) => 'Round: ' + (data + 1)),
        finalize(() => console.log('End.'))
      )
      .subscribe({
        next(count) {
          console.log(count);
        },
        error(error) {
          console.error(error);
        },
        complete() {
          console.log('Completed!');
        },
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
