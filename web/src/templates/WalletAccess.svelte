<script lang="ts">
  import Button from '../components/Button.svelte';
  import Toast from '../components/Toast.svelte';

  import {wallet, builtin, chain, transactions, balance} from '../stores/wallet';
</script>

{#if $chain && $chain.notSupported}
  <Toast>
    <strong class="font-bold">Wrong chain</strong>
    <span class="block sm:inline">Please switch to the mainnet</span> <!-- TODO -->
  </Toast>
{/if}

<slot />
