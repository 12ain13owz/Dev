import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private router: Router,
    private notify: NotifierService,
    private token: TokenService
  ) {}
  isLoading: boolean;

  generateFakeData(count: number): any[] {
    const data: any[] = [];
    for (let i = 0; i < count; i++) {
      data.push({});
    }
    return data;
  }

  showNotify(type: string, message: string) {
    this.notify.notify(type, message);
  }

  showAlert(title: string, message: string) {
    Swal.fire(title, message, 'success');
  }

  onAlertComfirm() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  }

  comparePassword(passwordField: string): object {
    return (cpassword: AbstractControl) => {
      if (!cpassword.parent) return;

      const password = cpassword.parent.get(passwordField);
      const passwordSubscripe = password?.valueChanges.subscribe(() => {
        cpassword.updateValueAndValidity();
        passwordSubscripe?.unsubscribe();
      });

      if (cpassword.value === password?.value) return;
      return { compare: true };
    };
  }

  isErrorHandler(status: number, type: string, message: string, dialog?: any) {
    if (status == 0) message = 'Error (500)! Bad request.';
    this.showNotify(type, message);

    if (status == 401 || status == 403) {
      dialog?.close(null);
      this.token.onLogout();
      this.router.navigate(['login']);
    }
  }
}
