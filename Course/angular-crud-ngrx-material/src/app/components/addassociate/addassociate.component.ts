import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  actionAddAssociate,
  updateAssociateAction,
} from 'src/app/store/associate/associate.actions';
import { getAssociateObject } from 'src/app/store/associate/associate.selectors';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.scss'],
})
export class AddassociateComponent implements OnInit, OnDestroy {
  associateForm: FormGroup;
  title = '';
  isEdit = false;

  dialogData: { code: number; title: string };
  subscription: Subscription;

  constructor(
    private store: Store,
    private builder: FormBuilder,
    private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { code: number; title: string }
  ) {
    this.initCreateForm();
  }

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.subscription = this.store
      .select(getAssociateObject)
      .subscribe((data) => {
        this.associateForm.setValue({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          type: data.type,
          group: data.associategroup,
          status: data.status,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveAssociate() {
    if (this.associateForm.invalid) return;
    const id = this.associateForm.value.id;

    if (id === 0)
      this.store.dispatch(
        actionAddAssociate({ input: this.associateForm.value })
      );
    else
      this.store.dispatch(
        updateAssociateAction({ input: this.associateForm.value })
      );
    this.onCloseAssociate();
  }

  onCloseAssociate() {
    this.ref.close();
  }

  initCreateForm() {
    this.associateForm = this.builder.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      type: ['CUSTOMER', Validators.required],
      group: ['level1', Validators.required],
      status: [true, Validators.required],
    });
  }
}
