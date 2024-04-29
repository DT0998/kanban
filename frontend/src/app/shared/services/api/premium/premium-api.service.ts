import { Injectable } from '@angular/core';
import { HttpService } from "../../http/http.service"

@Injectable({
    providedIn: 'root',
})
export class PremiumApiService {
    constructor(public httpService: HttpService) { }
    postSubPremium = async (address: string, name: string) => {
        return await this.httpService
            .post('api/subscribe-premium', {
                address,
                name,
            })
            .toPromise()
    }
}