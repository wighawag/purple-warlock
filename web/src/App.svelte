<script lang="ts">
  import {Router, CurrentPage} from './_routing';
  import pages from './pages';
  import Navbar from './components/Navbar.svelte';
  import Navigating from './_routing/curi/Navigating.svelte';
  import Loading from './components/Loading.svelte';
  import Notifications from './components/Notifications.svelte';
</script>

<Router {pages} globalQueryStrings={['subgraph', 'debug', 'log', 'trace']}>
  <Notifications />
  <Navbar links={['Home', 'Demo', 'Wallet']} />
  <CurrentPage>
    <Loading />
    Loading...
  </CurrentPage>
  <Navigating component={Loading} />
</Router>
