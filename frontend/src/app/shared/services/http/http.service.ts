import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(url: string, options?: any): Observable<any> {
    return this.http.get(`${environment.domainUrl}/${url}`, options);
  }

  post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(`${environment.domainUrl}/${url}`, body, options);
  }

  put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put(`${environment.domainUrl}/${url}`, body, options);
  }

  delete(url: string, options?: any): Observable<any> {
    return this.http.delete(`${environment.domainUrl}/${url}`, options);
  }
}
