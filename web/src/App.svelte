<script lang="ts">
  import {Router, CurrentPage} from './_routing';
  import pages from './pages';
  import Navbar from './components/Navbar.svelte';
</script>

<Router {pages} globalQueryStrings={['subgraph', 'debug', 'log']}>
  <Navbar links={['Home', 'Demo', 'Wallet']} />
  <CurrentPage>Loading...</CurrentPage>
</Router>
