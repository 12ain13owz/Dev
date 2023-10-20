import { Component } from '@angular/core';

import { interval, of } from 'rxjs';
import { exhaustMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud-ngrx-material';

  ngOnInit(): void {
    // สร้าง Observable ที่ส่งค่าทุกๆ 1 วินาที
    const source$ = interval(1000);
    let i = 0;

    // ใช้ exhaustMap เพื่อรอให้ source$ ส่งค่าเสร็จสิ้นก่อนจึงจะสร้าง Observable ใหม่จาก of(1)
    const result$ = source$.pipe(
      exhaustMap(() => {
        i++;
        return of(i).pipe(delay(500));
      }) // รอ 3 วินาที ก่อนที่จะสร้าง Observable ใหม่
    );

    // result$.subscribe((value) => console.log(value));
  }
}
