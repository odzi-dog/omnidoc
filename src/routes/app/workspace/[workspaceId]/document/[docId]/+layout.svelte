<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>odzi docs - { data.title }</title>
</svelte:head>

{ #key data.id }
    <slot />
{ /key }