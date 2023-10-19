import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { init } from './store/counter.actions';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.scss'],
})
export class NgrxComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(init());
  }
}
