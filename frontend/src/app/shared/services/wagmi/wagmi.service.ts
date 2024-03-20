import { Injectable } from '@angular/core';
import {
  createConfig,
  disconnect,
  connect,
  configureChains,
  ConnectResult,
  PublicClient,
} from '@wagmi/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { polygonMumbai } from '@wagmi/chains';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { environment } from '../../../../environments/environments';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  // use alchemy as the provider
  [alchemyProvider({ apiKey: environment.apiKeyAlchemy })]
);

// initialize the client
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new InjectedConnector({ chains })],
});

@Injectable({
  providedIn: 'root',
})
export class WagmiService {
  wagmiProvider!: ConnectResult<PublicClient>;
  constructor(public localStorageService: LocalStorageService) {}

  connectWallet = async () => {
    try {
      this.wagmiProvider = await connect({
        connector: new InjectedConnector({
          chains: [polygonMumbai],
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  disconnectWallet = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error(error);
    }
  };
}
