import { Injectable } from '@angular/core';
import { HistoryApiService } from '../api/history/history-api.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private historyApiService: HistoryApiService) { }
  getHistory = async (address: string) => {
    const res = await this.historyApiService.getHistory(address);
    return res;
  }
}
