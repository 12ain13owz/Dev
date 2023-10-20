import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObsUserService } from '../obs-user.service';

@Component({
  selector: 'app-observable-user',
  templateUrl: './observable-user.component.html',
  styleUrls: ['./observable-user.component.scss'],
})
export class ObservableUserComponent {
  id: number;
  sub: Subscription;
  constructor(private route: ActivatedRoute, private obsUser: ObsUserService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }

  ngOnDestroy(): void {
    console.log(this.sub.closed, 'user');
    this.sub.unsubscribe();
    console.log(this.sub.closed, 'user');
  }

  onActivate() {
    this.obsUser.activatedEmitter.emit(true); // ใช้ EventEmitter
    this.obsUser.activateSubject.next(true); // ใช้ Subject
  }
}
