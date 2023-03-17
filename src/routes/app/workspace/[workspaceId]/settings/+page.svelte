<script lang="ts">
	import { gotoWorkspacePage } from "$lib/helpers/workspace";
    import { onMount } from "svelte";

    onMount(() => {
        gotoWorkspacePage("/settings/general");
    });
</script>