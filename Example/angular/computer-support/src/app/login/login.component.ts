import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockDataService } from '../services/mock.data.service';
import { NavbarService } from '../services/navbar.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private mockData: MockDataService,
    private navs: NavbarService,
    private router: Router
  ) {}

  id: string = '';

  ngOnInit(): void {}

  onSubmit() {
    const data = this.mockData.findUserbyID(this.id);
    if (data) {
      this.mockData.setUserData = data;
      this.navs.show();
      this.router.navigate(['problem']);
    }
  }
}
