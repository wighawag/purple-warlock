<script>
  import names from "../stores/names";
  names.listen()
</script>

{#if !$names.status}
  <div>Name not loaded</div>
{:else if $names.status === 'error'}
  <div>Error</div>
{:else if $names.status === 'loading'}
  <div>Loading Names...</div>
{:else}
  {#each $names.data as name, index}
    <li>{name}</li>
  {/each}
{/if}
