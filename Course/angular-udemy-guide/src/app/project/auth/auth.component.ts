import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRespnseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: true })
  placeholder: PlaceholderDirective;

  private subscription: Subscription;
  email: string = 'test@example.com';
  password: string = '123456';

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const email = form.value.email;
    const password = form.value.password;
    let auth$: Observable<AuthRespnseData>;
    this.isLoading = true;
    this.error = '';

    if (this.isLoginMode) auth$ = this.authService.signin(email, password);
    else auth$ = this.authService.signup(email, password);

    auth$.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['../recipes'], { relativeTo: this.route });
      },
      error: (errMessage) => {
        console.log(errMessage);
        this.error = errMessage;
        this.isLoading = false;
        this.showErrorAlert(errMessage);
      },
      complete: () => console.log('%cComplete', 'color:#f9e64f'),
    });
    form.resetForm();
  }

  onHandlerError() {
    this.error = null;
  }

  private showErrorAlert(errMessage: string) {
    const component =
      this.placeholder.viewContainerRef.createComponent(AlertComponent);

    component.instance.message = errMessage;
    this.subscription = component.instance.close.subscribe(() => {
      this.subscription.unsubscribe();
      component.destroy();
    });
  }
}
