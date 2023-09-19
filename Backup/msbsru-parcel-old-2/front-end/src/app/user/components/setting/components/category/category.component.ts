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
import { CategoryModel } from 'src/app/user/shared/model/category.model';
import { FormService } from 'src/app/user/shared/service/form.service';
import { HttpService } from 'src/app/user/shared/service/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  destroy$: Subject<boolean> = new Subject<boolean>();
  isButton: boolean = false;
  form: FormGroup;
  displayedColumns: string[] = ['code', 'name', 'active', 'edit'];
  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource(
    this.fs.generateFakeData(5)
  );

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private http: HttpService,
    private dialog: MatDialog
  ) {
    this.createFormNewCategory();
  }

  ngOnInit(): void {
    this.getAllCategory();
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
      .newCategory(this.form.value)
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
    this.inputName.nativeElement.focus();
    this.formGroupDirective.resetForm();
  }

  getAllCategory(): void {
    this.http
      .getAllCategory()
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

  openDialog(form: CategoryModel): void {
    const dialogRef = this.dialog.open(EditCategoryDialog, {
      height: 'auto',
      width: '600px',
      data: form,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: CategoryModel) => {
        if (!result) return;
        const index = this.dataSource.data.findIndex(
          (data) => data.id == result.id
        );

        if (index >= 0) {
          this.dataSource.data[index].name = result.name;
          this.dataSource.data[index].remark = result.remark;
          this.dataSource.data[index].active = result.active;
          if (result.check) this.dataSource.data[index].code = result.code;
        }
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createFormNewCategory(): void {
    const codePattern = '^[A-Za-z0-9]{1,3}$';

    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(codePattern)]],
      name: ['', Validators.required],
      remark: [''],
    });
  }
}

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class EditCategoryDialog {
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
    private dialogRef: MatDialogRef<EditCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) private data: CategoryModel
  ) {
    this.createFormEditCategory();
  }

  ngOnInit(): void {
    this.data.name = 'test';
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
      code: this.code.value,
      name: this.name.value,
      active: this.active.value,
      remark: this.remark.value,
      check: this.isCheck,
    };

    this.http
      .editCategory(form)
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
    this.name.setValue('');
    this.remark.setValue('');
    this.inputName.nativeElement.focus();
  }

  isCodeActive(check: boolean): void {
    if (check) return this.code.enable();
    return this.code.disable();
  }

  createFormEditCategory(): void {
    const codePattern = '^[A-Za-z0-9]{1,3}$';

    this.form = this.fb.group({
      code: [
        { value: this.data.code, disabled: true },
        [Validators.required, Validators.pattern(codePattern)],
      ],
      name: [this.data.name, Validators.required],
      remark: [this.data.remark],
      active: [this.data.active, Validators.required],
    });
  }

  get code() {
    return this.form.controls['code'];
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
