import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.scss'],
})
export class ActiveUserComponent {
  // @Input() users: string[];
  // @Output() user: EventEmitter<number> = new EventEmitter();

  users: string[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.activeUser;
  }

  onSetToInActive(index: number) {
    this.userService.onSetToInActive(index);
    // this.user.emit(index);
  }
}
