import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../shared/service/http.service';

import { FormService } from '../../shared/service/form.service';
import { finalize, Subject, takeUntil, zip } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../../shared/model/item.model';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { StatusModel } from '../../shared/model/status.model';
import { CategoryModel } from '../../shared/model/category.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  url: string = environment.localhost;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') inputSearch: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();
  selection = new SelectionModel<ItemModel>(true, []);
  dataSource: MatTableDataSource<ItemModel> = new MatTableDataSource(
    this.fs.generateFakeData(20)
  );

  displayedColumns: string[] = [
    'select',
    'image_path',
    'track_id',
    'detail',
    'status',
    'category',
    'print',
    'edit',
  ];

  form: FormGroup;
  menuStatus: StatusModel[];
  menuCategory: CategoryModel[];
  searchTxt: string;
  isButton: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpService,
    private fb: FormBuilder,
    private fs: FormService,
    private dialog: MatDialog
  ) {
    this.createFormFilter();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getData(): void {
    this.isButton = true;
    const start = new Date(this.start.value.setHours(0, 0, 0, 0));
    const end = new Date(this.end.value.setHours(23, 59, 59, 999));

    zip(this.http.getDataSetItem(), this.http.getItemByDate(start, end))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isButton = false))
      )
      .subscribe({
        next: ([data, item]) => {
          this.menuStatus = data.status;
          this.menuCategory = data.category;
          this.menuStatus.unshift({
            id: 0,
            name: 'ทั้งหมด',
          });
          this.menuCategory.unshift({
            id: 0,
            code: '',
            name: 'ทั้งหมด',
          });

          this.dataSource = new MatTableDataSource(item);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.getFilterPredicate();
          this.onFilter();
        },
        error: (error) =>
          this.fs.isErrorHandler(error.status, 'error', error.error),
      });
  }

  getItemByDate(): void {
    this.isButton = true;
    this.dataSource = new MatTableDataSource(this.fs.generateFakeData(20));

    const start = new Date(this.start.value.setHours(0, 0, 0, 0));
    const end = new Date(this.end.value.setHours(23, 59, 59, 999));
    this.http
      .getItemByDate(start, end)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isButton = false))
      )
      .subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.getFilterPredicate();
          this.onFilter();
        },
        error: (error) =>
          this.fs.isErrorHandler(error.status, 'error', error.error),
      });
  }

  getFilterPredicate() {
    return (data: ItemModel, filters: string): boolean => {
      const filterArray = filters.split('$');
      const status = Number(filterArray[0]);
      const category = Number(filterArray[1]);
      const matchFilter = [];
      let filterStatus = false;
      let filterCategory = false;

      if (status == 0 || status == data.status_id) filterStatus = true;
      if (category == 0 || category == data.category_id) filterCategory = true;

      matchFilter.push(filterStatus);
      matchFilter.push(filterCategory);
      return matchFilter.every(Boolean);
    };
  }

  onFilter(index?: number): void {
    if (index !== undefined) this.status.setValue(index);
    const filter = {
      status: this.status.value.toString(),
      category: this.category.value.toString(),
    };

    const filterValue = `${filter.status}$${filter.category}`;
    this.dataSource.filter = filterValue;
  }

  openDialog(form: ItemModel) {
    const dialogRef = this.dialog.open(EditItemDialog, {
      height: 'auto',
      width: '600px',
      data: [form, this.menuStatus, this.menuCategory],
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: ItemModel) => {
        if (!result) return;
        const index = this.dataSource.data.findIndex(
          (data) => data.id == result.id
        );

        // if (result.active === undefined) result.active = true;
        // if (index >= 0) {
        //   this.dataSource.data[index].firstname = result.firstname;
        //   this.dataSource.data[index].lastname = result.lastname;
        //   this.dataSource.data[index].role = result.role;
        //   this.dataSource.data[index].remark = result.remark;
        //   this.dataSource.data[index].active = result.active;
        // }
      });
  }

  clearTxt(): void {
    this.searchTxt = '';
  }

  onOpened(): void {
    this.inputSearch?.nativeElement.focus();
  }

  handlePageBottom(event: PageEvent): void {
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.page.emit(event);
  }

  removeTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  createFormFilter(): void {
    const date = new Date();
    const d = date.getDate() - 7;
    const m = date.getMonth();
    const y = date.getFullYear();
    const start = new Date(y, m, d);
    const end = this.removeTime(date);

    this.form = this.fb.group({
      start: [start],
      end: [end],
      status: [0],
      category: [0],
    });
  }

  get start() {
    return this.form.controls['start'];
  }

  get end() {
    return this.form.controls['end'];
  }

  get status() {
    return this.form.controls['status'];
  }

  get category() {
    return this.form.controls['category'];
  }

  // onDeleteProduct(id: number, code: string): void {
  //   this.form.onAlertComfirm().then((result) => {
  //     if (result.isConfirmed) {
  //       this.spinLoading = true;
  //       this.http
  //         .deleteProduct(id)
  //         .subscribe({
  //           next: (data) => {
  //             this.form.showAlert(
  //               `Deleted! ${code}`,
  //               'Your file has been deleted.'
  //             );
  //             this.getAllProduct();
  //           },
  //           error: (err) => {
  //             if (err.status === 500) {
  //               this.form.showNotify('error', 'Error (500) Bad Request!');
  //             } else this.form.showNotify('error', err.error.message);
  //           },
  //         })
  //         .add(() => {
  //           this.spinLoading = false;
  //         });
  //     }
  //   });
  // }

  // generateBarcode() {
  //   const data = this.selection.selected;
  //   if (data.length <= 0) return;

  //   this.isDisabledBTNBarcode = true;
  //   this.http
  //     .generateBarcode(data)
  //     .subscribe({
  //       next: (data) => {
  //         this.downloadPDF(data.b64Data, data.filename);
  //       },
  //       error: (err) => {
  //         if (err.status === 500) {
  //           this.form.showNotify('error', 'Error (500) Bad Request!');
  //         } else this.form.showNotify('error', err.error.message);
  //       },
  //     })
  //     .add(() => {
  //       this.isDisabledBTNBarcode = false;
  //     });
  // }

  downloadPDF(pdf: string, filename: string) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement('a');

    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
    downloadLink.remove();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: ItemModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}

@Component({
  selector: 'app-edit-item',
  templateUrl: 'edit-item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class EditItemDialog {
  url: string = environment.localhost;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild('inputCode') inputCode: ElementRef;
  @ViewChild('inputDate') inputDate: ElementRef;
  @ViewChild('inputSearch') inputSearch: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  isButton: boolean = false;
  isProgressbar: boolean = false;
  files: File[] = [];
  item: ItemModel;
  menuStatus: StatusModel[];
  menuCategory: CategoryModel[];
  searchTxt: string;
  form: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private fs: FormService,
    private http: HttpService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<EditItemDialog>,
    @Inject(MAT_DIALOG_DATA)
    private data: [ItemModel, StatusModel[], CategoryModel[]]
  ) {
    this.item = this.data[0];
    this.menuStatus = this.data[1];
    this.menuCategory = this.data[2];
    this.createFormEditItem();
    this.onSetImage();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSelectFile(event: any): void {
    if (this.files.length >= 1) this.onRemoveFile(event);
    this.files.push(...event.addedFiles);
  }

  onRemoveFile(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onSetImage() {
    if (!this.image_path.value) return;

    const imgUrl = `${this.url}${this.item.image_path}`;
    const imgBase64 = await this.getBase64ImageFromUrl(imgUrl);
    const imgName = imgUrl.split('/').pop();
    const imgFile = this.dataURLtoFile(imgBase64, imgName);
    this.files.push(imgFile);
  }

  async getBase64ImageFromUrl(imageURL: string) {
    const result = await fetch(imageURL);
    const blob = await result.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.onerror = () => reject(this);
      reader.readAsDataURL(blob);
    });
  }

  dataURLtoFile(dataurl: any, filename: any): File {
    let arr: any = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isButton = true;
    this.isProgressbar = true;

    const received_date: any = this.datePipe.transform(
      this.received_date.value,
      'dd/MM/yyyy'
    );
    let form = new FormData();

    form.append('id', this.id.value);
    form.append('code', this.code.value);
    form.append('old_code', this.old_code.value);
    form.append('received_date', received_date);
    form.append('category_id', this.category.value.id);
    form.append('category_code', this.category.value.code);
    form.append('status', this.status.value);
    form.append('detail', this.detail.value);
    form.append('image_path', this.image_path.value);
    form.append('image', this.files[0]);

    this.http
      .editItem(form)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isButton = false;
          this.isProgressbar = false;
        })
      )
      .subscribe({
        next: (data) => {
          //this.dialogRef.close(form);
          //this.fs.showNotify('success', data.message);
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
    if (this.files.length >= 1) this.files = [];
    this.formGroupDirective.resetForm();
    this.inputCode.nativeElement.focus();
  }

  createFormEditItem(): void {
    const codePattern =
      '^[0-9]{2}[-][0-9]{2}[-][0-9]{6}[-][0-9]{3}[-][0-9]{5}[-][0-9]{4}$';

    this.form = this.fb.group({
      id: [this.item.id],
      track: [
        { value: this.item.track_id, disabled: true },
        [Validators.required],
      ],
      code: [
        this.item.code,
        [Validators.required, Validators.pattern(codePattern)],
      ],
      old_code: [this.item.old_code],
      received_date: [this.item.received_date, Validators.required],
      category: [
        {
          id: this.item.category_id,
          code: this.menuCategory[this.item.category_id].code,
          name: this.menuCategory[this.item.category_id].name,
        },
        Validators.required,
      ],
      status: [this.item.status_id, Validators.required],
      detail: [this.item.detail, Validators.required],
      image_path: [this.item.image_path],
    });
  }

  get id() {
    return this.form.controls['id'];
  }

  get track() {
    return this.form.controls['track'];
  }

  get code() {
    return this.form.controls['code'];
  }

  get old_code() {
    return this.form.controls['old_code'];
  }

  get received_date() {
    return this.form.controls['received_date'];
  }

  get category() {
    return this.form.controls['category'];
  }

  get status() {
    return this.form.controls['status'];
  }

  get detail() {
    return this.form.controls['detail'];
  }

  get image_path() {
    return this.form.controls['image_path'];
  }

  clearTxt(): void {
    this.searchTxt = '';
  }

  onOpened(): void {
    this.inputSearch?.nativeElement.focus();
  }

  objectComparison(data: CategoryModel, value: CategoryModel): boolean {
    return data.id === value.id;
  }

  onDateInput(data: Date): void {
    let received_date;

    if (data == null) {
      const value = this.inputDate.nativeElement.value;
      const date = value.split('/');
      const year = Number(date[2]) - 543;
      received_date = new Date(`${date[1]}-${date[0]}-${year}`);
    }

    if (data) {
      const day = data.getDate();
      const month = data.getMonth() + 1;
      const year = data.getFullYear() - 543;
      received_date = new Date(`${day}-${month}-${year}`);
    }

    this.received_date.setValue(received_date);
  }

  onChipSelect(value?: number): void {
    this.status.setValue(value);
  }
}
