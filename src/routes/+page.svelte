<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    import { UserStore } from '$lib/stores/User.store';

    onMount(() => {
        if ($UserStore) {
            goto("/app");
        } else {
            // Redirecting to login page
            goto("/login");
        };
    });
</script>