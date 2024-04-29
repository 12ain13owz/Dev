import { Component, signal } from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { auditTime, debounceTime } from 'rxjs';

@Component({
  selector: 'app-shopping-search',
  templateUrl: './shopping-search.component.html',
  styleUrl: './shopping-search.component.scss',
})
export class ShoppingSearchComponent {
  onInput = signal<string>('');
  onSearch = outputFromObservable(
    toObservable(this.onInput).pipe(auditTime(400))
  );

  inputSearch(value: string) {
    this.onInput.set(value);
  }
}

// private subscription = new Subscription();
// private themeService = inject(ThemeService);

// readonly darkTheme = this.themeService.getThemeMode();
// private darkTheme$ = toObservable(this.darkTheme); // Test Signals to Observable

// ngOnInit(): void {
//   this.subscription = this.darkTheme$.subscribe((theme) => {
//     // console.log(theme);
//   });
// }
