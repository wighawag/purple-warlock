import {derived, Readable} from 'svelte/store';
import type {WalletStore, ChainStore} from 'web3w';

type WalletFlowData = {
  state: 'Idle' | 'WalletChoice';
};

export default (
  wallet: WalletStore,
  chain: ChainStore,
  config: {autoSelect: boolean}
): Readable<WalletFlowData> & {
  ensureReady(): Promise<boolean>;
  cancel(): void;
} => {
  let _ready = false;

  const $data: WalletFlowData = {
    state: 'Idle',
  };
  let _set: (value: WalletFlowData) => void;
  function setStore(data: Partial<WalletFlowData>) {
    Object.assign($data, data);
    _set($data);
  }
  const walletFlow = derived(
    [wallet, chain],
    ([$wallet, $chain], set) => {
      _set = set;
      if ($wallet.state === 'Ready' && $chain.state === 'Ready') {
        if (!_ready) {
          _ready = true;
          setStore({
            state: 'Idle',
          });
          _resolve && _resolve(true);
        }
      } else {
        if (_ready) {
          _ready = false;
          _promise = undefined;
        }
      }
    },
    $data
  );

  let _promise: Promise<boolean> | undefined;
  let _resolve: (val: boolean) => void;
  let _reject: (err: unknown) => void;

  return {
    subscribe: walletFlow.subscribe,
    ensureReady(): Promise<boolean> {
      if (_ready) {
        _promise = Promise.resolve(true);
      }
      if (_promise) {
        return _promise;
      }
      setStore({state: 'WalletChoice'});

      _promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
      });

      if (config.autoSelect && wallet.options.length === 1) {
        wallet.connect(wallet.options[0]).catch((error) => {
          _promise = undefined;
          _reject(error);
        });
      }

      return _promise;
    },
    cancel(): void {
      _reject({code: 1, message: 'Cancel'});
      _promise = undefined;
      _reject = undefined;
      _resolve = undefined;
      _set({state: 'Idle'});
    },
  };
};
