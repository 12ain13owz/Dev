import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription, filter } from 'rxjs';
import { Account } from 'src/app/services/account.model';
import { HttpService } from 'src/app/services/http.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss'],
})
export class ListAccountComponent implements OnInit, OnDestroy {
  storeService = inject(StoreService);
  httpService = inject(HttpService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  subscription = new Subscription();
  account: Account[];

  id: number;
  editMode: boolean = false;
  editForm: FormGroup;

  ngOnInit(): void {
    this.initEditForm();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    this.subscription.add(
      this.storeService.accountChanged.subscribe((account: Account[]) => {
        this.account = account;

        if (this.account.length <= 0) {
          this.router.navigate(['/list']);
          return;
        }
        if (this.editMode) this.onEdit(this.storeService.getAccount(this.id));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initEditForm() {
    this.editForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
    });
  }

  onEdit(account: Account) {
    this.editForm.setValue({
      id: account.id,
      username: account.username,
      password: account.password,
      firstname: account.firstname,
      lastname: account.lastname,
    });
  }

  onDelete(id: number) {
    this.httpService.deleteAccount(id);
  }

  onSubmit() {
    if (this.editForm.invalid) return;
    this.httpService.editAccount(this.editForm.value);
  }
}
