<script lang="ts">
  export let title: string = undefined;
  import Button from '../components/Button.svelte';
  import Toast from '../components/Toast.svelte';
  import Modal from '../components/Modal.svelte';

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

{#if $flow.inProgress}
  <Modal {title} on:close={() => flow.cancel()}>
    {#if $wallet.state === 'Idle'}
      {#if $wallet.connecting}
        Connecting to wallet...
      {:else}
        You need to connect your wallet.
        <Button label="Connect to Wallet" on:click={() => wallet.connect(wallet.options[0])}>connect</Button>
      {/if}
    {:else if $wallet.state === 'Locked'}
      {#if $wallet.unlocking}
        Please accept the application to access your wallet.
      {:else}
        <Button label="Unlock Wallet" on:click={() => wallet.connect(wallet.options[0])}>Unlock</Button>
      {/if}
    {:else if $chain.state === 'Idle'}
      {#if $chain.connecting}Connecting...{/if}
    {:else if $chain.state === 'Connected'}
      {#if $chain.loadingData}Loading contracts...{/if}
    {:else if $wallet.pendingUserConfirmation}
      Please accept transaction...
    {:else if $flow.error}
      {#if $flow.error.code === 4001}
        You rejected the request
      {:else if $flow.error.message}{$flow.error.message}{:else}Error: {$flow.error}{/if}
      <Button label="Retry" on:click={() => flow.retry()}>Retry</Button>
    {/if}
  </Modal>
{/if}
