<script lang="ts">
	import { CurrentWorkspaceStore } from "$lib/stores/Application";
	import { page } from "$app/stores";
    import { onDestroy, onMount } from "svelte";
	import { goto } from "$app/navigation";

    onMount(() => {
        // Getting information about current workspace
        CurrentWorkspaceStore.fetchById($page.params.workspaceId)
            .catch(() => {
                goto("/app");
            });
    });

    onDestroy(() => {
        CurrentWorkspaceStore.clear();
    });
</script>

<slot />