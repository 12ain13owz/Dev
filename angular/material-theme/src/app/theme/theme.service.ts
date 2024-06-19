import { DOCUMENT } from '@angular/common';
import {
  Injectable,
  Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private keyTheme = 'dark-theme';
  private document = inject(DOCUMENT);
  private darkTheme = signal<boolean>(
    JSON.parse(localStorage.getItem(this.keyTheme) ?? 'false')
  );

  constructor() {
    effect(() => {
      localStorage.setItem(this.keyTheme, JSON.stringify(this.darkTheme()));

      if (this.darkTheme())
        this.document.documentElement.classList.add(this.keyTheme);
      else this.document.documentElement.classList.remove(this.keyTheme);
    });
  }

  isDarkTheme(): Signal<boolean> {
    return computed(() => this.darkTheme());
  }

  switchTheme(theme: boolean) {
    this.darkTheme.set(theme);
  }
}
