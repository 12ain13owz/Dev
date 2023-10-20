import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockDataService } from '../services/mock.data.service';

@Component({
  selector: 'app-confirmproblem',
  templateUrl: './confirmproblem.component.html',
  styleUrls: ['./confirmproblem.component.scss'],
})
export class ConfirmproblemComponent implements OnInit {
  constructor(public mockData: MockDataService, private router: Router) {}

  csno = 'CS10003';
  problem = 'เมาส์เสีย';

  ngOnInit(): void {}

  onSubmit() {
    this.router.navigate(['problem']);
  }

  onCancel() {
    this.router.navigate(['home']);
  }
}
