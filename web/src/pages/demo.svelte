<script lang="ts">
  import WalletAccess from '../templates/WalletAccess.svelte';
  import Button from '../components/Button.svelte';
  import Blockie from '../components/Blockie.svelte';

  import names from '../stores/names';
  names.listen();

  import CommonLib from 'common-lib';

  import {logs} from 'named-logs';
  import {wallet, flow} from '../stores/wallet';
  const console = logs('app:home');
  console.log('CommonLib', CommonLib);

  let name: string = undefined;

  async function setName() {
    await flow.ensureReady();
    await wallet.contracts.GobelinRegistry.setName(name);
  }
</script>

<WalletAccess>
  <section class="py-8 px-4">
    {#if !$names.status}
      <div>Name not loaded</div>
    {:else if $names.status === 'Error'}
      <div>Error</div>
    {:else if $names.status === 'Loading'}
      <div>Loading Names...</div>
    {:else}
      {#each $names.data as name, index}
        <!-- <Blockie address={name.id} /> -->
        <div class={`flex flex-wrap items-center -mx-2 ${name.id === $wallet.address ? 'font-bold' : 'font-normal'}`}>
          <!-- <div class="px-2 mb-6">
            <h2 class="text-xl">{`${name.id.slice(0, 4)}...${name.id.slice(name.id.length - 4)}`} :</h2>
          </div> -->
          <Blockie address={name.id} class="m-1" />
          <span class="px-2">
            <p>{name.name}</p>
          </span>
        </div>
      {/each}
    {/if}
  </section>

  <form class="w-full max-w-sm">
    <div class="flex items-center border-b border-pink-600 py-2">
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight
          focus:outline-none"
        type="text"
        placeholder="Jane Doe"
        aria-label="Full name"
        bind:value={name} />
      <button
        on:click={setName}
        class="flex-shrink-0 bg-pink-600 hover:bg-pink-700 border-pink-600 hover:border-pink-700 text-sm border-4
          text-white py-1 px-2 rounded"
        type="button">
        Set Name
      </button>
    </div>
  </form>

  <!-- <label for="name">Set your Name</label>
  <input type="text" id="name" bind:value={name} />
  <Button primary="true" class="w-max-content inline-block" on:click={setName}>Set Name</Button> -->
</WalletAccess>
