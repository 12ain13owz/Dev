import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { ErrorComponent } from '../components/error/error.component';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  private dialog = inject(MatDialog);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknow error occurred!';
        if (error.error.message) errorMessage = error.error.message;

        this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
        return throwError(() => error);
      })
    );
  }
}

export const ErrorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
