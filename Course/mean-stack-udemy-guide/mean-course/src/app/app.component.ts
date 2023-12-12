import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostModule } from './components/post.module';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, PostModule, HeaderComponent],
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
