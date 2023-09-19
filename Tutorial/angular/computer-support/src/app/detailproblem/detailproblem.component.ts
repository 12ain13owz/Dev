import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService, reportData } from '../services/mock.data.service';

@Component({
  selector: 'app-detailproblem',
  templateUrl: './detailproblem.component.html',
  styleUrls: ['./detailproblem.component.scss'],
})
export class DetailproblemComponent implements OnInit {
  constructor(
    public mockData: MockDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  id: any = '';
  role: string = '';
  role2: boolean = false;

  reportData: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.reportData = this.mockData.findReportbyID(this.id);
    this.role = this.mockData.getUserData.department;

    if (this.role == 'Admin') {
      this.role2 = true;
    } else {
      this.role2 = false;
    }

    console.log(this.role, this.role2);
  }

  onBack() {
    this.router.navigate(['problem']);
  }
}
