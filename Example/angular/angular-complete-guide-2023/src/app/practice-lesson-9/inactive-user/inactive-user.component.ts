import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.scss'],
})
export class InactiveUserComponent {
  // @Input() users: string[];
  // @Output() user: EventEmitter<number> = new EventEmitter();

  users: string[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.inactiveUser;
  }

  onSetToActive(index: number) {
    this.userService.onSetToActive(index);
    // this.user.emit(index);
  }
}
