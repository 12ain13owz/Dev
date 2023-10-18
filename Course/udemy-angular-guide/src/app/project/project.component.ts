import { Component, inject } from '@angular/core';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  loggingService = inject(LoggingService);

  ngOnInit(): void {
    this.loggingService.printLog('Hello form ProjectComponent ngOnInit');
  }
}
