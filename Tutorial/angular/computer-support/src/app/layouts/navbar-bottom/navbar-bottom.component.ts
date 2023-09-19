import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.scss'],
})
export class NavbarBottomComponent implements OnInit {
  constructor(public navs: NavbarService) {}

  ngOnInit() {}
}
