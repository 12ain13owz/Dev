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
import { StatusModel } from 'src/app/user/shared/model/status.model';
import { FormService } from 'src/app/user/shared/service/form.service';
import { HttpService } from 'src/app/user/shared/service/http.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  destroy$: Subject<boolean> = new Subject<boolean>();
  isButton: boolean = false;
  form: FormGroup;
  displayedColumns: string[] = ['name', 'active', 'edit'];
  dataSource: MatTableDataSource<StatusModel> = new MatTableDataSource(
    this.fs.generateFakeData(5)
  );

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private http: HttpService,
    private dialog: MatDialog
  ) {
    this.createFormNewStatus();
  }

  ngOnInit(): void {
    this.getAllStatus();
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
      .newStatus(this.form.value)
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

  getAllStatus(): void {
    this.http
      .getAllStatus()
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

  openDialog(form: StatusModel): void {
    const dialogRef = this.dialog.open(EditStatusDialog, {
      height: 'auto',
      width: '600px',
      data: form,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: StatusModel) => {
        if (!result) return;
        const index = this.dataSource.data.findIndex(
          (data) => data.id == result.id
        );

        if (index >= 0) {
          this.dataSource.data[index].active = result.active;
          this.dataSource.data[index].remark = result.remark;
          if (result.check) this.dataSource.data[index].name = result.name;
        }
      });
  }

  onReset(): void {
    this.inputName.nativeElement.focus();
    this.formGroupDirective.resetForm();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createFormNewStatus(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      remark: [''],
    });
  }
}

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class EditStatusDialog {
  @ViewChild('inputName') inputName: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();

  isButton: boolean = false;
  isProgressbar: boolean = false;
  isCheck: boolean = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private http: HttpService,
    private dialogRef: MatDialogRef<EditStatusDialog>,
    @Inject(MAT_DIALOG_DATA) private data: StatusModel
  ) {
    this.createFormEditCategory();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isButton = true;
    this.isProgressbar = true;

    const form = {
      id: this.data.id,
      name: this.name.value,
      remark: this.remark.value,
      active: this.active.value,
      check: this.isCheck,
    };

    this.http
      .editStatus(form)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isButton = false;
          this.isProgressbar = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.dialogRef.close(form);
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
    this.isCheck = true;
    this.name.enable();
    this.name.setValue('');
    this.remark.setValue('');
    this.inputName.nativeElement.focus();
  }

  isNameActive(check: boolean): void {
    if (check) return this.name.enable();
    return this.name.disable();
  }

  createFormEditCategory(): void {
    this.form = this.fb.group({
      name: [{ value: this.data.name, disabled: true }, Validators.required],
      remark: [this.data.remark],
      active: [this.data.active, Validators.required],
    });
  }

  get name() {
    return this.form.controls['name'];
  }

  get remark() {
    return this.form.controls['remark'];
  }

  get active() {
    return this.form.controls['active'];
  }
}
