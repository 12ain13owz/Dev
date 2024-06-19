import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-switch-theme',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, FormsModule],
  templateUrl: './switch-theme.component.html',
  styleUrl: './switch-theme.component.scss',
})
export class SwitchThemeComponent {
  private themeService = inject(ThemeService);
  readonly isDarkTheme = this.themeService.isDarkTheme();

  onSwitchTheme() {
    this.themeService.switchTheme(!this.isDarkTheme());
  }
}
