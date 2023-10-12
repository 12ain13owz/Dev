import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Outgoing request');
    console.log(request.url);
    console.log(request.headers);

    return next.handle(request).pipe(
      tap((event) => {
        console.log('Logging event: ', event);
        if (event.type === HttpEventType.Response) {
          console.log('Incoming response:', event.body);
        }
      })
    );
  }
}
