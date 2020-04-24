<!-- ---------- SERVER SIDE RENDERRING ----------- -->
<script context="module">
import names from '../stores/names';
export async function preload() {
    return names.preload();
}
</script>

<script>
export let data;
names.restore(data);
//// ---------- SERVER SIDE RENDERRING ----------- ///

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
