import WalletStores from 'web3w';
import {TorusModuleLoader} from 'web3w-torus-loader';
import contractsInfo from '../contracts.json';

const walletStores = WalletStores({
  // log: console,
  // debug: true,
  chainConfigs: contractsInfo,
  builtin: {autoProbe: true},
  options: ['builtin', new TorusModuleLoader({verifier: 'google', fallbackUrl: 'http://localhost:8545'})],
});

if (typeof window !== 'undefined') {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (window as any).walletStores = walletStores;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export const {wallet, transactions, builtin, chain, balance, flow} = walletStores;
