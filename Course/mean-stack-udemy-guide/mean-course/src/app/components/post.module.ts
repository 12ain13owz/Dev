import { NgModule } from '@angular/core';
import { PostService } from './post.service';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { PostRoutingModule } from './post-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorProviders } from './auth/auth.interceptor';
import { ErrorInterceptorProviders } from '../core/error.interceptor';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
  ],
  imports: [CoreModule, RouterModule, PostRoutingModule, FormsModule],
  providers: [
    AuthService, // ถ้าไม่ใส่ interceptor จะไม่ทำงาน
    PostService,
    AuthInterceptorProviders,
  ],
})
export class PostModule {}
