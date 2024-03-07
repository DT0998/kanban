import { Injectable } from '@angular/core';
import {
  InjectedConnector,
  connect,
  createClient,
  disconnect,
} from '@wagmi/core';
import { getDefaultProvider } from 'ethers';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

@Injectable({
  providedIn: 'root',
})
export class WagmiService {
  constructor() {}

  async connectWallet() {
    try {
      const test = await connect({ connector: new InjectedConnector() });
      console.log(test);
    } catch (error) {
      console.error(error);
    }
  }

  async disconnectWallet() {
    try {
      await disconnect();
    } catch (error) {}
  }
}
