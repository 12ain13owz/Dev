import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { init } from './store/counter.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-complete-guide-2023-ngrx';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(init());
  }
}
