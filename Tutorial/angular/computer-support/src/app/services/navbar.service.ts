import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor() {}

  visible: boolean = true;

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
