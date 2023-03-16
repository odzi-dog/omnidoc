<script lang="ts">
	import { onMount } from "svelte";
    import { page } from "$app/stores";

    onMount(() => {
        // Checking if we have identity id in our query
        if ($page.url.searchParams.has("identityId")) {
            // Getting user information from OryService
            window.location.href = `/api/identity/authorize?identityId=${ $page.url.searchParams.get("identityId") }`;
        } else {
            const url = new URL("https://auth.odzi.dog/flow");
            
            url.searchParams.set("redirectUrl", "https://docs.odzi.dog/login");
            url.searchParams.set("redirectVisualIdentifier", "docs.odzi.dog");
    
            window.location.href = url.toString();
        };
    });  
</script>
