<script lang="ts">
	import { gotoWorkspacePage } from "$lib/helpers/workspace";
    import { SettingsPageMetaStore } from "./_stores";
</script>

<main class="w-full h-full">
    <!-- Settings page title -->
    <div class="mb-6">
        <h1 class="text-2xl text-white font-bold">Settings</h1>
    </div>

    <!-- Header -->
    <div class="w-full flex gap-4 rounded-xl border-2 border-zinc-800 p-2">
        { #each $SettingsPageMetaStore.pages as page }
            { @const isCurrentlySelectedPage = page == $SettingsPageMetaStore.currentPage }
        
            <button on:click={() => {
                gotoWorkspacePage(`/settings/${ page.id || page.title.toLowerCase() }`);
            }} class="rounded-xl px-4 py-2 transition { isCurrentlySelectedPage ? "bg-zinc-800 hover:bg-zinc-700" : "hover:bg-zinc-800" }">
                <p class="{ isCurrentlySelectedPage ? "text-white" : "text-gray-300" }">{ page.title }</p>
            </button>
        { /each }
    </div>

    <!-- Page content -->
    <slot />
</main>