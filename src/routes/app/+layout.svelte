<script lang="ts">
	import { goto } from "$app/navigation";
	import SocketsConnectionBadge from "$lib/components/Layout/LoggedIn/SocketsConnectionBadge.svelte";
    import { ApplicationStore } from "$lib/stores/Application.store";
	import { SynchronizationStore } from "$lib/stores/Synchronization.store";
	import { onMount } from "svelte";
    import { UserStore } from '$lib/stores/User.store';
	import { page } from "$app/stores";
	import { AllowedGuestRoutes } from "./_allowedGuestRoutes.const";

    onMount(() => {
        if ($UserStore != null) {
            // Initializing our ApplicationStore
            ApplicationStore.initialize();

            // Connecting to our centrifugo instance
            SynchronizationStore.initialize();
        } else {
            // Subscribing to page store to forbid users from accessing
            // secured pages
            page.subscribe((page) => {
                if (!AllowedGuestRoutes.find((x) => x.test(page.url.toString()))) {
                    goto("/login");
                };
            });
        };
    });
</script>

<slot />

{ #if $UserStore }
    <!-- Sockets connecting status -->
    <div class="absolute bottom-0 right-0 p-2">
        <SocketsConnectionBadge />
    </div>
{ /if }