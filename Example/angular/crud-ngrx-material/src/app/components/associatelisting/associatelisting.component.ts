import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/store/models/associate.model';
import {
  getAssociateList,
  getAssociateObject,
} from 'src/app/store/associate/associate.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  deleteAssociateAction,
  getAssociateAction,
  initLoadAssociate,
  openPopupAction,
} from 'src/app/store/associate/associate.actions';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.scss'],
})
export class AssociatelistingComponent implements OnInit {
  associtaeList: Associates[];

  dataSource: MatTableDataSource<Associates>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'code',
    'name',
    'email',
    'phone',
    'address',
    'type',
    'group',
    'status',
    'action',
  ];

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(initLoadAssociate());
    this.store.select(getAssociateList).subscribe((associate: Associates[]) => {
      this.associtaeList = associate;
      this.dataSource = new MatTableDataSource<Associates>(this.associtaeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onAdd() {
    this.openDialog(0, 'Create Associate');
  }

  onEditAssociate(code: number) {
    this.store.dispatch(getAssociateAction({ code: code }));
    this.openDialog(code, 'Update Associate');
  }

  onDeleteAssociate(code: number) {
    if (confirm('Do you want to remove?'))
      this.store.dispatch(deleteAssociateAction({ code: code }));
  }

  openDialog(code: number, title: string) {
    this.store.dispatch(openPopupAction());
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        code: code,
        title: title,
      },
    });
  }
}
