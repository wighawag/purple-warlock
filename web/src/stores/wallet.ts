import WalletStores from 'web3w';
import WalletFlow from '../lib/walletFlow';
import contractsInfo from '../contracts.json';

const walletStores = WalletStores({
  // log: console,
  // debug: true,
  chainConfigs: contractsInfo,
  builtin: {autoProbe: true},
});

export const flow = WalletFlow(walletStores.wallet, walletStores.chain, {autoSelect: false});

if (typeof window !== 'undefined') {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (window as any).walletStores = walletStores;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

/* eslint-disable @typescript-eslint/no-explicit-any */
if (typeof window !== 'undefined') {
  (window as any).walletStores.flow = flow;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const {wallet, transactions, builtin, chain, balance} = walletStores;
