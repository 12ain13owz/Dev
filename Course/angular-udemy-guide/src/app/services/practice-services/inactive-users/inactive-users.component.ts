import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.scss'],
})
export class InactiveUsersComponent {
  users: string[] = [];
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this.usersService.inactiveUsers;
  }

  setInactive(id: number) {
    this.usersService.setToActive(id);
  }
}
