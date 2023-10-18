import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestComponent } from './http-request.component';
import { HttpRequestRoutingModule } from './http-request-routing.module';
import { FormsModule } from '@angular/forms';
import { PostsService } from './post.service';
import { AuthInterceptor } from './auth.interceptor';
import { LoggingInterceptor } from './logging.interceptor';

@NgModule({
  declarations: [HttpRequestComponent],
  imports: [
    CommonModule,
    HttpRequestRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    PostsService,
    // multer Interceptors ทำงานตามลำดับ
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // 1.
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }, // 2.
  ],
})
export class HttpRequestModule {}
