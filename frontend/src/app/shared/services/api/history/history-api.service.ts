import { Injectable } from '@angular/core';
import { HttpService } from "../../http/http.service"

@Injectable({
    providedIn: 'root',
})
export class HistoryApiService {
    constructor(public httpService: HttpService) { }
    getHistory = async (address: string) => {
        return await this.httpService
            .get(`api/history/${address}`)
            .toPromise();
    }
}