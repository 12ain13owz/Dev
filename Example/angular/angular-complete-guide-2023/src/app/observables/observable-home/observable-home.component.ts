import { Component } from '@angular/core';
import {
  Observable,
  Subject,
  interval,
  takeUntil,
  Observer,
  fromEvent,
  scan,
  Subscription,
  share,
  map,
  filter,
} from 'rxjs';

@Component({
  selector: 'app-observable-home',
  templateUrl: './observable-home.component.html',
  styleUrls: ['./observable-home.component.scss'],
})
export class ObservableHomeComponent {
  value: number = 0;
  private firstObsSubscription: Subscription;

  ngOnInit(): void {
    // this.firstObsSubscription = interval(1000)
    //   .pipe()
    //   .subscribe((count) => {
    //     console.log(count);
    //   });

    const customIntervalObservable: Observable<number> = Observable.create(
      (observer: Observer<number>) => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count == 5) {
            observer.complete();
          }

          if (count > 3) {
            observer.error(new Error('Count is greater 3'));
          }

          count++;
        }, 1000);
      }
    );

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data) => {
          if (data % 2) return !true;
          else return !false;
        }),
        map((data) => {
          return 'Round: ' + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('complete');
        }
      );

    // ลอง click ปุ่มและเพิ่ม value ที่ละ 1
    // const btn = document.querySelector('button');
    // fromEvent(btn, 'click')
    //   .pipe(scan((acc) => acc + 1, this.value))
    //   .subscribe((newValue) => {
    //     console.log(newValue, this.value);
    //     this.value = newValue;
    //   });
  }

  add() {}

  ngOnDestroy(): void {
    console.log(this.firstObsSubscription.closed, 1);
    this.firstObsSubscription.unsubscribe();
    console.log(this.firstObsSubscription.closed, 2);
  }
}
