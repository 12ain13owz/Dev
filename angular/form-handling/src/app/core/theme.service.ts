import {
  Injectable,
  Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private darkTheme = signal<boolean>(
    JSON.parse(localStorage.getItem('darkTheme') ?? 'false')
  );

  constructor() {
    effect(() => {
      localStorage.setItem('darkTheme', JSON.stringify(this.darkTheme()));

      if (this.darkTheme())
        this.document.documentElement.classList.add('dark-theme');
      else this.document.documentElement.classList.remove('dark-theme');
    });
  }

  getThemeMode(): Signal<boolean> {
    return computed(() => this.darkTheme());
  }

  setThemeMode(theme: boolean) {
    this.darkTheme.set(theme);
  }
}
