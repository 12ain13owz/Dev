import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../shared/service/http.service';

import {
  EditProductModel,
  TableProductModel,
} from '../../shared/model/product.model';
import { FormService } from '../../shared/service/form.service';

@Component({
  selector: 'app-product',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<TableProductModel>(true, []);
  dataSource = new MatTableDataSource<TableProductModel>();
  displayedColumns: string[] = [
    'select',
    'code',
    'stock',
    'title',
    'edit',
    'delete',
  ];
  spinLoading: boolean = false;
  isDisabledBTNBarcode: boolean = false;

  constructor(
    private http: HttpService,
    public form: FormService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  getAllProduct(): void {
    this.spinLoading = true;
    this.http
      .getAllProduct()
      .subscribe({
        next: (data: TableProductModel[]) => {
          this.dataSource = new MatTableDataSource<TableProductModel>(data);
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          if (err.status === 500) {
            this.form.showNotify('error', 'Error (500) Bad Request!');
          } else this.form.showNotify('error', err.error.message);
        },
      })
      .add(() => {
        this.spinLoading = false;
      });
  }

  onDeleteProduct(id: number, code: string): void {
    this.form.onAlertComfirm().then((result) => {
      if (result.isConfirmed) {
        this.spinLoading = true;
        this.http
          .deleteProduct(id)
          .subscribe({
            next: (data) => {
              this.form.showAlert(
                `Deleted! ${code}`,
                'Your file has been deleted.'
              );
              this.getAllProduct();
            },
            error: (err) => {
              if (err.status === 500) {
                this.form.showNotify('error', 'Error (500) Bad Request!');
              } else this.form.showNotify('error', err.error.message);
            },
          })
          .add(() => {
            this.spinLoading = false;
          });
      }
    });
  }

  generateBarcode() {
    const data = this.selection.selected;
    if (data.length <= 0) return;

    this.isDisabledBTNBarcode = true;
    this.http
      .generateBarcode(data)
      .subscribe({
        next: (data) => {
          this.downloadPDF(data.b64Data, data.filename);
        },
        error: (err) => {
          if (err.status === 500) {
            this.form.showNotify('error', 'Error (500) Bad Request!');
          } else this.form.showNotify('error', err.error.message);
        },
      })
      .add(() => {
        this.isDisabledBTNBarcode = false;
      });
  }

  downloadPDF(pdf: string, filename: string) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement('a');

    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
    downloadLink.remove();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  checkboxLabel(row?: TableProductModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}

// @Component({
//   selector: 'app-edit-product',
//   templateUrl: 'edit-product.component.html',
// })
// export class EditProductDialog {
//   @ViewChild('inputTitle') inputTitle: ElementRef;
//   form: FormGroup;
//   isDisabled: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private fs: FormService,
//     private http: HttpService,
//     private dialogRef: MatDialogRef<EditProductDialog>,
//     public dialog: MatDialog,
//     @Inject(MAT_DIALOG_DATA) private data: EditProductModel
//   ) {
//     this.createFormEditProduct();
//   }

//   ngAfterViewInit(): void {
//     this.dialog.afterOpened
//       .subscribe(() => {
//         this.inputTitle.nativeElement.focus();
//       })
//       .unsubscribe();
//   }

//   onSubmit(): void {
//     if (this.form.invalid) return;

//     this.isDisabled = true;
//     const form = {
//       id: this.id.value,
//       code: this.code.value,
//       title: this.title.value,
//       stock: Number(this.stock.value),
//       addStock: Number(this.addStock.value),
//       specification: this.specification.value,
//     };

//     this.http
//       .editProduct(form)
//       .subscribe({
//         next: (data) => {
//           this.dialogRef.close(form);
//           this.fs.showNotify('success', data.message);
//         },
//         error: (err) => {
//           if (err.status === 500) {
//             this.fs.showNotify('error', 'Error (500) Bad Request!');
//           } else this.fs.showNotify('error', err.error.message);
//         },
//       })
//       .add(() => {
//         this.isDisabled = false;
//       });
//   }

//   onReset(): void {
//     this.createFormEditProduct();
//     this.inputTitle.nativeElement.focus();
//   }

//   createFormEditProduct() {
//     this.form = this.fb.group({
//       id: [this.data.id],
//       code: [{ value: this.data.code, disabled: true }, [Validators.required]],
//       title: [this.data.title],
//       stock: [
//         { value: this.data.stock, disabled: true },
//         [Validators.required, Validators.pattern('^[0-9]*$')],
//       ],
//       addStock: ['0', [Validators.required, Validators.pattern('^[0-9]*$')]],
//       specification: [this.data.specification],
//     });
//   }

//   NumberOnly(number: string, value: AbstractControl) {
//     number = number.replace(/[^0-9]/g, '');
//     number = number.replace(/^(?!00[^0])0/, '');
//     number = number == '' ? '0' : number;
//     value.setValue(number);
//   }

//   get id() {
//     return this.form.controls['id'];
//   }

//   get code() {
//     return this.form.controls['code'];
//   }

//   get title() {
//     return this.form.controls['title'];
//   }

//   get stock() {
//     return this.form.controls['stock'];
//   }

//   get addStock() {
//     return this.form.controls['addStock'];
//   }

//   get specification() {
//     return this.form.controls['specification'];
//   }
// }
