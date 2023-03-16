<script lang="ts">
	import { CurrentWorkspaceStore } from "$lib/stores/Application";
	import { page } from "$app/stores";
    import { onMount } from "svelte";

    onMount(() => {
        // Getting information about current workspace
        CurrentWorkspaceStore.fetchById($page.params.workspaceId);
    });
</script>

<slot />