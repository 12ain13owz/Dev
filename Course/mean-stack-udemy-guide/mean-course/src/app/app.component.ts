import { Component } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ComponentsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

// title = 'mean-course';
// role = role;

// ngOnInit(): void {
//   this.role.Admin;
//   console.log(role[0]);
// }
// enum role {
//   Admin,
//   User,
// }
