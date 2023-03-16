<script lang="ts">
	import { goto } from "$app/navigation";
	import { getUser } from "@lucia-auth/sveltekit/client";
	import { onMount } from "svelte";

    const user = getUser();

    onMount(() => {
        if ($user) {
            goto("/app");
        } else {
            // Redirecting to login page
            goto("/login");
        };
    });
</script>