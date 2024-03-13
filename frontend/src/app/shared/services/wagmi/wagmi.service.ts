import { Injectable } from '@angular/core';
import {
  createConfig,
  disconnect,
  connect,
  configureChains,
} from '@wagmi/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { polygonMumbai } from '@wagmi/chains';
import { createPublicClient, http } from 'viem';
import { publicProvider } from '@wagmi/core/providers/public';

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

// initialize the client
const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});

@Injectable({
  providedIn: 'root',
})
export class WagmiService {
  constructor() {}

  async connectWallet() {
    try {
      await connect({
        connector: new InjectedConnector({
          chains: [polygonMumbai],
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async disconnectWallet() {
    try {
      await disconnect();
    } catch (error) {
      console.error(error);
    }
  }
}
