<script lang="ts">
	import { CurrentWorkspaceStore } from "$lib/stores/Application";
	import { page } from "$app/stores";
    import { onDestroy, onMount } from "svelte";
	import { goto } from "$app/navigation";
    import { subscribe as subscribeToWorkspaceChanges, unsubscribe as unsubscribeFromWorkspaceChanges } from "./_subscriptions";
    import { UserStore } from "$lib/stores/User.store";

    onMount(async () => {
        if ($UserStore) {
            // Getting information about current workspace
            await CurrentWorkspaceStore.fetchById($page.params.workspaceId)
                .catch(() => {
                    goto("/app");
                });

            await subscribeToWorkspaceChanges();
        };
    });

    onDestroy(async () => {
        if ($UserStore) await unsubscribeFromWorkspaceChanges();

        CurrentWorkspaceStore.clear();
    });
</script>

<slot />