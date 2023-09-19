import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() sidenavToggle = new EventEmitter();
  theme: string;
  defaultTheme: string = 'light-theme';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.setDefaultTheme();
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  setDefaultTheme() {
    const classTheme = this.document.documentElement.classList;
    this.theme = localStorage.getItem('theme');

    if (!this.theme) {
      this.theme = this.defaultTheme;
      localStorage.setItem('theme', this.defaultTheme);
      return classTheme.add(this.defaultTheme);
    }

    if (this.theme == 'dark-theme') return classTheme.add('dark-theme');
  }

  onSwitchTheme() {
    const classTheme = this.document.documentElement.classList;
    this.theme = localStorage.getItem('theme');

    if (this.theme == 'light-theme') {
      this.theme = 'dark-theme';
      classTheme.add('dark-theme');
      return localStorage.setItem('theme', 'dark-theme');
    }

    if (this.theme == 'dark-theme') {
      this.theme = 'light-theme';
      classTheme.remove('dark-theme');
      return localStorage.setItem('theme', 'light-theme');
    }
  }
}
