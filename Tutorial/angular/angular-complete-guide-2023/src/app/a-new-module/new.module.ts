import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new.component';
import { NewRoutingModule } from './new-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormHttpComponent } from './components/form-http/form-http.component';
import { PostsService } from './components/form-http/posts.service';
import { AuthInterceptorService } from './components/form-http/auth-interceptor.service';
import { loggingInterceptor } from './components/form-http/loggin-interceptor.service';

const interceptor: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};

@NgModule({
  declarations: [NewComponent, FormHttpComponent],
  imports: [CommonModule, NewRoutingModule, FormsModule, HttpClientModule],
  providers: [PostsService, interceptor, loggingInterceptor],
})
export class NewModule {}
