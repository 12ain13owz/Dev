import { Component, OnInit } from '@angular/core';
import { FormService } from '../../shared/service/form.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  constructor(public fs: FormService) {}

  ngOnInit(): void {}
}
