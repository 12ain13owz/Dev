import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Provider } from '@angular/core';
import { Observable, tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // set New Headers
    // let a = req.clone({
    //   headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
    // });

    console.log('auth request');

    const modifiedRequest = req.clone({
      headers: req.headers.append('auth', 'xyz'),
    });

    return next.handle(modifiedRequest).pipe(tap(this.logResponse));
  }

  private logResponse(event: HttpEvent<any>): void {
    // if (event.type === HttpEventType.Response) console.log(event.body);
  }
}
