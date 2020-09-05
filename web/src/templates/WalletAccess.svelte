<script lang="ts">
  import Button from '../components/Button.svelte';
  import Toast from '../components/Toast.svelte';

  import {wallet, builtin, chain, transactions, balance, flow} from '../stores/wallet';
</script>

{#if $chain && $chain.notSupported}
  <Toast>
    <strong class="font-bold">Wrong chain</strong>
    <span class="block sm:inline">Please switch to the mainnet</span>
    <!-- TODO -->
  </Toast>
{/if}

<slot />

{#if $flow.state === 'WalletChoice'}
  <div class="bg-red-400 w-10 h-10" on:click={() => flow.cancel()} />
  <div class="bg-green-400 w-10 h-10" on:click={() => wallet.connect(wallet.options[0])} />
{/if}

{#if $wallet.unlocking}Unlocking...{/if}

{#if $wallet.pendingUserConfirmation}Please accept transaction request...{/if}
