<script lang="ts">
	import { goto } from "$app/navigation";
	import SocketsConnectionBadge from "$lib/components/Layout/LoggedIn/SocketsConnectionBadge.svelte";
    import { ApplicationStore } from "$lib/stores/Application.store";
	import { SynchronizationStore } from "$lib/stores/Synchronization.store";
	import { getUser } from "@lucia-auth/sveltekit/client";
	import { onMount } from "svelte";

    const user = getUser();

    onMount(() => {
        if ($user == null) {
            return goto("/login");
        };

        // Initializing our ApplicationStore
        ApplicationStore.initialize();

        // Connecting to our centrifugo instance
        SynchronizationStore.initialize();
    });
</script>

{ #if $user != null }
    <slot />

    <!-- Sockets connecting status -->
    <div class="absolute bottom-0 right-0 p-2">
        <SocketsConnectionBadge />
    </div>
{ /if }