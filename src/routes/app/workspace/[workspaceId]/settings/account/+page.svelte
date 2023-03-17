<script lang="ts">
	import { onMount } from "svelte";
    import { SettingsPageMetaStore } from "../_stores";

    onMount(() => {
        SettingsPageMetaStore.setCurrentPage("account");
    });
</script>