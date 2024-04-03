import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { CoreModule } from '../../core.module';
import { ThemeService } from '../../theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-switch-theme',
  standalone: true,
  imports: [CoreModule, FormsModule],
  templateUrl: './switch-theme.component.html',
  styleUrl: './switch-theme.component.scss',
})
export class SwitchThemeComponent {
  private subscription = new Subscription();
  private themeService = inject(ThemeService);

  readonly darkTheme = this.themeService.getThemeMode();
  private darkTheme$ = toObservable(this.darkTheme); // Test Signals to Observable

  ngOnInit(): void {
    this.subscription = this.darkTheme$.subscribe((theme) => {
      // console.log(theme);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSwitchTheme(): void {
    this.themeService.setThemeMode(!this.darkTheme());
  }
}
