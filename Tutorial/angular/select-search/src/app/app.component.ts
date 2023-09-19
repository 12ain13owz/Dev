import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'select-search';
  @ViewChild('inputSearch') inputSearch?: ElementRef;

  constructor() {}

  selectedValue: any;
  searchTxt: any;

  items = [
    {
      id: 1,
      code: 'RAM',
      name: 'แรม',
    },
    {
      id: 2,
      code: 'MB',
      name: 'เมนบอร์ด',
    },
    {
      id: 3,
      code: 'C',
      name: 'เคส',
    },
  ];

  clearTxt() {
    this.searchTxt = '';
  }

  onOpen() {
    this.inputSearch?.nativeElement.focus();
  }
}
