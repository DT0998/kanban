import { Injectable } from '@angular/core';
import { HttpService } from "../../http/http.service"

@Injectable({
    providedIn: 'root',
})
export class ProfileApiService {
    constructor(public httpService: HttpService) { }
    getProfile = async (address: string) => {
        return await this.httpService
            .get(`api/profile/${address}`)
            .toPromise();
    };
}