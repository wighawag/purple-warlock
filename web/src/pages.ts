import HomePage from './pages/home.svelte';
import DemoPage from './pages/demo.svelte';
import WalletPage from './pages/wallet.svelte';
import NotFound from './pages/notfound.svelte';

export default [
  {
    name: 'Wallet',
    path: 'wallet',
    component: WalletPage,
  },
  {
    name: 'Home',
    path: '',
    component: HomePage,
  },
  {
    name: 'Demo',
    path: 'demo',
    component: DemoPage,
  },
  {
    name: 'NotFound',
    path: '.*',
    component: NotFound,
  },
];
