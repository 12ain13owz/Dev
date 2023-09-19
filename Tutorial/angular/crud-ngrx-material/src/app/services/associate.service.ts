import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associates } from '../store/models/associate.model';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  baseURL = 'http://localhost:3000/associate';

  constructor(private http: HttpClient) {}

  getAssociates(): Observable<Associates[]> {
    return this.http.get<Associates[]>(this.baseURL);
  }

  getAssociatesByCode(code: number): Observable<Associates> {
    return this.http.get<Associates>(this.baseURL + '/' + code);
  }

  deleteAssociates(code: number) {
    return this.http.delete<Associates>(this.baseURL + '/' + code);
  }

  updateAssociates(data: Associates) {
    return this.http.put<Associates>(this.baseURL + '/' + data.id, data);
  }

  createAssociates(data: Associates) {
    return this.http.post<Associates>(this.baseURL, data);
  }
}
