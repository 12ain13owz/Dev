import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AccountModel } from 'src/app/user/shared/model/account.model';
import { FormService } from 'src/app/user/shared/service/form.service';
import { HttpService } from 'src/app/user/shared/service/http.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @ViewChild('inputUsername') inputUsername: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  destroy$: Subject<boolean> = new Subject<boolean>();
  isButton: boolean = false;
  form: FormGroup;
  displayedColumns: string[] = [
    'username',
    'fullname',
    'role',
    'active',
    'edit',
  ];
  dataSource: MatTableDataSource<AccountModel> = new MatTableDataSource(
    this.fs.generateFakeData(5)
  );

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private http: HttpService,
    private dialog: MatDialog
  ) {
    this.createFormNewAccount();
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isButton = true;
    this.fs.isLoading = true;

    this.http
      .newAccount(this.form.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isButton = false;
          this.fs.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.fs.showNotify('success', data.message);
          this.dataSource.data.push(data.result);
          this.dataSource.data = [...this.dataSource.data];
          this.onReset();
        },
        error: (error) =>
          this.fs.isErrorHandler(error.status, 'error', error.error),
      });
  }

  onReset(): void {
    this.inputUsername.nativeElement.focus();
    this.formGroupDirective.resetForm();
    this.role.setValue(1);
  }

  getAllAccount(): void {
    this.http
      .getAllAccount()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) =>
          this.fs.isErrorHandler(error.status, 'error', error.error),
      });
  }

  openDialog(form: AccountModel): void {
    const dialogRef = this.dialog.open(EditAccountDialog, {
      height: 'auto',
      width: '600px',
      data: form,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: AccountModel) => {
        if (!result) return;
        const index = this.dataSource.data.findIndex(
          (data) => data.id == result.id
        );

        if (result.active === undefined) result.active = true;
        if (index >= 0) {
          this.dataSource.data[index].firstname = result.firstname;
          this.dataSource.data[index].lastname = result.lastname;
          this.dataSource.data[index].role = result.role;
          this.dataSource.data[index].remark = result.remark;
          this.dataSource.data[index].active = result.active;
        }
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createFormNewAccount(): void {
    const usernamePattern = '^[a-z0-9_-]{4,15}$';
    const passwordPattern =
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$';

    this.form = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(usernamePattern)],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(passwordPattern)],
      ],
      cpassword: [
        '',
        [Validators.required, this.fs.comparePassword('password')],
      ],
      firstname: [''],
      lastname: [''],
      role: [1, Validators.required],
      remark: [''],
    });
  }

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get firstname() {
    return this.form.controls['firstname'];
  }

  get lastname() {
    return this.form.controls['lastname'];
  }

  get role() {
    return this.form.controls['role'];
  }

  get remark() {
    return this.form.controls['remark'];
  }
}

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class EditAccountDialog {
  @ViewChild('inputFirstname') inputFirstname: ElementRef;
  @ViewChild('inputPassword') inputPassword: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();

  isButton: boolean = false;
  isButtonPassword: boolean = false;
  isProgressbar: boolean = false;
  isCheck: boolean = false;

  form: FormGroup;
  formPassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private http: HttpService,
    private dialogRef: MatDialogRef<EditAccountDialog>,
    @Inject(MAT_DIALOG_DATA) private data: AccountModel
  ) {
    this.createFormEditAccount();
    this.createFormPassword();
  }

  ngOnInit(): void {
    if (this.data.username === 'admin') this.active.disable();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isButton = true;
    this.isProgressbar = true;

    this.http
      .editAccount(this.form.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isButton = false;
          this.isProgressbar = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.dialogRef.close(this.form.value);
          this.fs.showNotify('success', data.message);
        },
        error: (error) =>
          this.fs.isErrorHandler(
            error.status,
            'error',
            error.error,
            this.dialogRef
          ),
      });
  }

  onReset(): void {
    this.firstname.setValue('');
    this.lastname.setValue('');
    this.remark.setValue('');
    this.inputFirstname.nativeElement.focus();
  }

  onSubmitChangePassword(): void {
    if (this.formPassword.invalid) return;
    this.isButtonPassword = true;
    this.isProgressbar = true;

    this.http
      .editAccountPassword(this.formPassword.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isButtonPassword = false;
          this.isProgressbar = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.dialogRef.close(null);
          this.fs.showNotify('success', data.message);
        },
        error: (error) =>
          this.fs.isErrorHandler(
            error.status,
            'error',
            error.error,
            this.dialogRef
          ),
      });
  }

  onResetChangePassword(): void {
    this.formPassword.reset();
    this.inputPassword.nativeElement.focus();
  }

  createFormEditAccount(): void {
    this.form = this.fb.group({
      id: [this.data.id, Validators.required],
      username: [
        { value: this.data.username, disabled: true },
        Validators.required,
      ],
      firstname: [this.data.firstname],
      lastname: [this.data.lastname],
      role: [this.data.role, Validators.required],
      remark: [this.data.remark],
      active: [this.data.active, Validators.required],
    });
  }

  get firstname() {
    return this.form.controls['firstname'];
  }

  get lastname() {
    return this.form.controls['lastname'];
  }

  get role() {
    return this.form.controls['role'];
  }

  get remark() {
    return this.form.controls['remark'];
  }

  get active() {
    return this.form.controls['active'];
  }

  createFormPassword(): void {
    const passwordPattern =
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$';

    this.formPassword = this.fb.group({
      id: [this.data.id, Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(passwordPattern)],
      ],
      cpassword: [
        '',
        [Validators.required, this.fs.comparePassword('password')],
      ],
    });
  }

  get password() {
    return this.formPassword.controls['npassword'];
  }

  get cpassword() {
    return this.formPassword.controls['cpassword'];
  }
}
