import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, merge, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'table-responsive';
  sub = new Subscription();

  number_1 = of({ no: 1 });
  number_2 = of(4, 5, 6);

  ngOnInit(): void {
    // unsubscribe ไม่ทำงาน
    merge(this.number_1, this.number_2)
      .subscribe((res) => {
        // console.log(res);
      })
      .unsubscribe();

    // วิธีที่ถูกต้อง
    this.sub = merge(this.number_1, this.number_2).subscribe((res) => {
      // console.log(res);
      this.sub.unsubscribe();
    });
  }
}
