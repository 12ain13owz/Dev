import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Request is on its way');
    console.log(request.url);
    const modifiedRequest = request.clone({
      headers: request.headers.append('Auth', 'xyz'),
    });

    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        console.log('Event intercept:', event);
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived, body data: ', event.body);
        }
      })
    );
  }
}
