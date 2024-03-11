import { Injectable } from '@angular/core';
import {
  createConfig,
  configureChains,
  mainnet,
  disconnect,
  connect,
  fetchEnsName,
  ConnectResult,
  PublicClient,
  getContract,
  readContract,
  writeContract,
} from '@wagmi/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { publicProvider } from '@wagmi/core/providers/public';
import { polygonMumbai } from '@wagmi/chains';

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
  wagmiProvider!: ConnectResult<PublicClient>;
  constructor() {}

  async connectWallet() {
    try {
      this.wagmiProvider = await connect({
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
    } catch (error) {}
  }
}
