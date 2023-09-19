import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/services/account.model';
import { HttpService } from 'src/app/services/http.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  storeService = inject(StoreService);
  httpService = inject(HttpService);
  subscription = new Subscription();
  account: Account[];

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
    });

    this.account = this.storeService.getAccount();
    this.subscription = this.storeService.accountChanged.subscribe(
      (account: Account[]) => (this.account = account)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.httpService.addAccount(this.registerForm.value);
  }
}
