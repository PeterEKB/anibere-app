import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingApiService {
  constructor(private http: HttpClient) {}

  getCategories(id: string = ''): Observable<object> {
    return this.http.get(`/api/booking/${id}`);
  }
  getStyles(id: string = ''): Observable<object> {
    return this.http.get(`/api/booking/svc/${id}`);
  }
}
