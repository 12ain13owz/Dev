import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditProductModel, SearchProductModel } from '../model/product.model';
import { CategoryModel } from '../model/category.model';
import { StatusModel } from '../model/status.model';
import { AccountModel } from '../model/account.model';

const USER_API = environment.USER_API;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  newItem(form: FormData): Observable<any> {
    return this.http.post(`${USER_API}item`, form);
  }

  editItem(form: FormData): Observable<any> {
    return this.http.patch(`${USER_API}item`, form);
  }

  getDataSetItem(): Observable<any> {
    return this.http.get(`${USER_API}sitem`, {
      responseType: 'json',
    });
  }

  getItemByDate(start: Date, end: Date): Observable<any> {
    return this.http.get(`${USER_API}item/${start}/${end}`, {
      responseType: 'json',
    });
  }

  newAccount(form: AccountModel): Observable<any> {
    return this.http.post(`${USER_API}account`, form, httpOptions);
  }

  editAccount(form: AccountModel): Observable<any> {
    return this.http.patch(`${USER_API}account`, form, httpOptions);
  }

  editAccountPassword(form: AccountModel): Observable<any> {
    return this.http.patch(`${USER_API}account/cpassword`, form, httpOptions);
  }

  getAllAccount(): Observable<any> {
    return this.http.get(`${USER_API}account`, {
      responseType: 'json',
    });
  }

  newCategory(form: CategoryModel): Observable<any> {
    return this.http.post(`${USER_API}category`, form, httpOptions);
  }

  editCategory(form: CategoryModel): Observable<any> {
    return this.http.patch(`${USER_API}category`, form, httpOptions);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${USER_API}category`, {
      responseType: 'json',
    });
  }

  newStatus(form: StatusModel): Observable<any> {
    return this.http.post(`${USER_API}status`, form, httpOptions);
  }

  editStatus(form: StatusModel): Observable<any> {
    return this.http.patch(`${USER_API}status`, form, httpOptions);
  }

  getAllStatus(): Observable<any> {
    return this.http.get(`${USER_API}status`, {
      responseType: 'json',
    });
  }

  editProduct(form: EditProductModel): Observable<any> {
    return this.http.put(`${USER_API}product`, form, httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${USER_API}product/${id}`, httpOptions);
  }

  getProductByCode(code: string): Observable<any> {
    return this.http.get(`${USER_API}product/${code}`, {
      responseType: 'json',
    });
  }

  getAllProduct(): Observable<any> {
    return this.http.get(`${USER_API}product`, { responseType: 'json' });
  }

  getAllStock(): Observable<any> {
    return this.http.get(`${USER_API}stock`, { responseType: 'json' });
  }

  cutProductStock(form: SearchProductModel[]): Observable<any> {
    return this.http.put(`${USER_API}stock`, form, httpOptions);
  }

  generateBarcode(form: any): Observable<any> {
    return this.http.post(`${USER_API}generate`, form, httpOptions);
  }
}
