import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private httpService: HttpService) {}
  async getHistory(address: string) {
    const res = await this.httpService
      .get(`api/history/${address}`)
      .toPromise();
    return res;
  }
}
