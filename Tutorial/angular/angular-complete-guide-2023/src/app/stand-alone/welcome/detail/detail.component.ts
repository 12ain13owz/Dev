import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';
import { SharedModule } from '../../shared/shared.module';
import { HighlightDirective } from '../../shared/highlight.directive';

@Component({
  standalone: true,
  imports: [HighlightDirective],
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [AnalyticsService],
})
export class DetailComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
