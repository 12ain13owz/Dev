import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../shared/service/http.service';
import { TableStockModel } from '../../shared/model/product.model';
import { FormService } from '../../shared/service/form.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource = new MatTableDataSource<TableStockModel>();
  displayedColumns: string[] = [
    'createdAt',
    'code',
    'quantity',
    'addStock',
    'detail',
  ];
  spinLoading: boolean = false;

  constructor(private http: HttpService, private fs: FormService) {}

  ngOnInit(): void {
    this.getAllStock();
  }

  getAllStock() {
    this.spinLoading = true;
    this.http
      .getAllStock()
      .subscribe({
        next: (data: TableStockModel[]) => {
          this.dataSource = new MatTableDataSource<TableStockModel>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          if (err.status === 500) {
            this.fs.showNotify('error', 'Error (500) Bad Request!');
          } else this.fs.showNotify('error', err.error.message);
        },
      })
      .add(() => {
        this.spinLoading = false;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
