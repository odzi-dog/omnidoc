<script lang="ts">
	import { goto } from "$app/navigation";
    import { ApplicationStore } from "$lib/stores/Application.store";
	import { getUser } from "@lucia-auth/sveltekit/client";
	import { onMount } from "svelte";

    const user = getUser();

    onMount(() => {
        if ($user == null) {
            return goto("/login");
        };

        // Initializing our ApplicationStore
        ApplicationStore.initialize();
    });
</script>

{ #if $user != null }
    <slot />
{ /if }