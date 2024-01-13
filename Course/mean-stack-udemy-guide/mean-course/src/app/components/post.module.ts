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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { AuthService } from './auth/auth.service';
=======
>>>>>>> parent of 79694a1 (Update course mean stack)
=======
import { ErrorInterceptorProviders } from '../core/error.interceptor';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './error/error.component';
>>>>>>> parent of 28fb870 (Update course mean stack)
=======
import { ErrorInterceptorProviders } from '../core/error.interceptor';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './error/error.component';
>>>>>>> parent of 28fb870 (Update course mean stack)

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
  ],
  imports: [CoreModule, RouterModule, PostRoutingModule, FormsModule],
  providers: [PostService, AuthInterceptorProviders],
})
export class PostModule {}
