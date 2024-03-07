import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WagmiService {
  client!: any;
  constructor() {}

  async connect() {}
}
