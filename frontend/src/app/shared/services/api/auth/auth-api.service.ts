import { Injectable } from '@angular/core';
import { HttpService } from "../../http/http.service"

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {
    constructor(public httpService: HttpService) { }
    postRefreshToken = (payload: PayloadRefreshToken) => {
        return this.httpService.post('api/token', payload);
    }

    postLogin = async (payload: PayloadLogin) => {
        return await this.httpService
            .post('api/login', payload)
            .toPromise()
    }
}

interface PayloadRefreshToken extends PayloadLogin {
    refreshToken: string;
}

interface PayloadLogin {
    address: string;
}