import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { finalize, retry, Subscription, timeout } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpService } from '../../shared/service/http.service';
import { FormService } from '../../shared/service/form.service';
import { TokenService } from '../../shared/service/token.service';
import { UserModel } from '../../shared/model/account.model';
import { StatusModel } from '../../shared/model/status.model';
import { CategoryModel } from '../../shared/model/category.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private token: TokenService,
    private dialog: MatDialog
  ) {}

  @Output() sidenavToggle = new EventEmitter();

  subscribe: Subscription;
  title: any = '';
  menuTitle: Title[] = [
    { title: 'scan', titleTH: 'สแกน' },
    { title: 'item', titleTH: 'อุปกรณ์' },
    { title: 'search', titleTH: 'ค้นหา' },
    { title: 'log', titleTH: 'ประวัติ' },
    { title: 'setting', titleTH: 'ตั้งค่า' },
  ];
  user: UserModel;

  ngOnInit(): void {
    this.user = this.token.getUser();
    this.title = this.menuTitle.find(
      (data) => data.title == this.getPath
    )?.titleTH;

    if (!this.title)
      this.title = this.menuTitle.find(
        (data) => data.title == this.getPathOnId[0]
      )?.titleTH;

    this.subscribe = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.title = this.menuTitle.find(
          (data) => data.title == this.getPath
        )?.titleTH;

      if (!this.title)
        this.title = this.menuTitle.find(
          (data) => data.title == this.getPathOnId[0]
        )?.titleTH;
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  onLogout() {
    this.token.onLogout();
    this.router.navigate(['/login']);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  get getPath() {
    return this.router.url.split('/').pop();
  }

  get getPathOnId() {
    return this.router.url.split('/').slice(-2);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewItemDialog, {
      height: 'auto',
      width: '600px',
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}

export interface Title {
  title: string;
  titleTH: string;
}

@Component({
  selector: 'app-new-item',
  templateUrl: 'new-item.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DatePipe],
})
export class NewItemDialog {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild('inputCode') inputCode: ElementRef;
  @ViewChild('inputDate') inputDate: ElementRef;
  @ViewChild('inputDetail') inputDetail: ElementRef;
  @ViewChild('inputSearch') inputSearch: ElementRef;

  form: FormGroup;
  isButton: boolean = false;
  isProgressbar: boolean = false;
  files: File[] = [];
  menuStatus: StatusModel[] = [{ id: 0, name: '' }];
  menuCategory: CategoryModel[];
  searchTxt: string;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private http: HttpService,
    private router: Router,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<NewItemDialog>
  ) {
    this.createFormNewItem();
  }

  ngOnInit(): void {
    this.setDataItem();
    this.setData();
  }

  onSelectFile(event: any): void {
    if (this.files.length >= 1) this.onRemoveFile(event);
    this.files.push(...event.addedFiles);
  }

  onRemoveFile(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
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

    form.append('code', this.code.value);
    form.append('old_code', this.old_code.value);
    form.append('received_date', received_date);
    form.append('category_id', this.category.value.id);
    form.append('category_code', this.category.value.code);
    form.append('status', this.status.value);
    form.append('detail', this.detail.value);
    form.append('image', this.files[0]);

    this.http
      .newItem(form)
      .pipe(
        retry(3),
        timeout(10000),
        finalize(() => {
          this.isButton = false;
          this.isProgressbar = false;
          this.inputCode.nativeElement.focus();
        })
      )
      .subscribe({
        next: (data) => {
          this.fs.showNotify('success', 'เพิ่มอุปกรณ์สำเร็จ');
          //this.router.navigateByUrl('/item', { skipLocationChange: false });
          if (this.repeat.value) {
            // this.code.setValue('');
            // this.old_code.setValue('');
          }
          if (!this.repeat.value) this.onReset();
        },
        error: (error) => {
          if (!error.error) error.error = error.message;
          this.fs.isErrorHandler(
            error.status,
            'error',
            error.error,
            this.dialogRef
          );
        },
      });
  }

  onReset(): void {
    if (this.files.length >= 1) this.files = [];
    this.formGroupDirective.resetForm();
    this.inputCode.nativeElement.focus();
  }

  setDataItem() {
    this.isProgressbar = true;
    this.isButton = true;
    this.form.disable();

    this.http
      .getDataSetItem()
      .pipe(
        finalize(() => {
          this.isProgressbar = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.menuStatus = data.status;
          this.menuCategory = data.category;
          this.isButton = false;
          this.isProgressbar = false;
          this.form.enable();
        },
        error: (error) =>
          this.fs.isErrorHandler(error.status, 'error', error.error),
      });
  }

  createFormNewItem(): void {
    const codePattern =
      '^[0-9]{2}[-][0-9]{2}[-][0-9]{6}[-][0-9]{3}[-][0-9]{5}[-][0-9]{4}$';

    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(codePattern)]],
      old_code: [''],
      received_date: ['', Validators.required],
      category: ['', Validators.required],
      status: [1, Validators.required],
      detail: ['', Validators.required],
      repeat: [false],
    });
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

  get repeat() {
    return this.form.controls['repeat'];
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

  onOldCodeKeydown(event: KeyboardEvent): void {
    if (event.key != 'Tab') return;
    if (this.repeat.value == false) return;

    setTimeout(() => {
      this.inputDetail.nativeElement.focus();
    }, 10);
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

  setData() {
    let date = new Date('12-25-2008');
    this.code.setValue('52-21-090208-215-00616-0023');
    this.old_code.setValue('บบส.52 01.64.411');
    this.received_date.setValue(date);
    this.category.setValue({
      id: 1,
      code: 'MON',
      name: 'จอภาพ',
    });
    this.status.setValue(1);
    this.detail.setValue('เครื่องไมโครคอมพิวเตอร์');
    this.repeat.setValue(true);
  }
}
