import { Injectable } from '@angular/core';
import {
  createConfig,
  disconnect,
  connect,
  http,
  ConnectReturnType,
} from '@wagmi/core';
import { polygonMumbai } from '@wagmi/chains';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { environment } from '../../../../environments/environments';
import { walletConnect } from '@wagmi/connectors';
import { injected } from '@wagmi/connectors';

// [alchemyProvider({ apiKey: environment.apiKeyAlchemy })]
const projectId = environment.projectId;

// initialize the client
export const config = createConfig({
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http(
      `${polygonMumbai.rpcUrls.alchemy.http[0]}/${environment.apiKeyAlchemy}`
    ),
  },
  connectors: [walletConnect({ projectId }), injected()],
});

@Injectable({
  providedIn: 'root',
})
export class WagmiService {
  wagmiProvider!: ConnectReturnType<typeof config>;
  constructor(public localStorageService: LocalStorageService) {}

  connectWallet = async () => {
    try {
      this.wagmiProvider = await connect(config, {
        connector: injected(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  disconnectWallet = async () => {
    try {
      await disconnect(config);
    } catch (error) {
      console.error(error);
    }
  };
}
