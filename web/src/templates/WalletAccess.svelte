<script lang="ts">
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
  <Modal on:close={() => flow.cancel()}>
    {#if $wallet.state === 'Idle'}
      {#if $wallet.connecting}
        Connecting to wallet...
      {:else}
        You need to connect your wallet.
        <Button on:click={() => wallet.connect(wallet.options[0])}>connect</Button>
      {/if}
    {:else if $wallet.state === 'Locked'}
      {#if $wallet.unlocking}
        Please accept the application to access your wallet.
      {:else}
        <Button on:click={() => wallet.connect(wallet.options[0])}>Unlock</Button>
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
    {/if}
  </Modal>
{/if}
<!-- {#if $flow.requestingContracts}
  <div class="bg-red-400 w-10 h-10" on:click={() => flow.cancel()} />
  <div class="bg-green-400 w-10 h-10" on:click={() => wallet.connect(wallet.options[0])} />
{/if} -->

{#if $wallet.unlocking}Unlocking...{/if}

{#if $wallet.pendingUserConfirmation}Please accept transaction request...{/if}
