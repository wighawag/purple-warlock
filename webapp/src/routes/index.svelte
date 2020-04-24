<!-- ---------- SERVER SIDE RENDERRING ----------- -->
<script context="module">
import {client, NAMES} from '../graphql';
export async function preload() {
    try {
        const data = await client.query({
            query: NAMES
        });
        console.log({data});
        return {data: data.data};
    } catch (e) {
        console.error(e);
    }
    return {data: null};
}
</script>

<script>
export let data;
import names from '../stores/names';
names.restore(data);
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
