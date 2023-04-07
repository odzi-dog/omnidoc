<script lang="ts">
	import { CurrentWorkspaceStore } from '$lib/stores/Application';
    import CarbonChevronSort from '~icons/carbon/chevron-sort';
    import CarbonFolder from '~icons/carbon/folder';

    export let folderId: string | null = null;
</script>

<button on:click|preventDefault|stopPropagation={() => {}} name="location_chooser" class="w-full mt-2 mb-8 rounded-xl text-gray-400 flex items-center justify-between bg-zinc-800 py-2 px-3">
    <div class="flex items-center">
        <CarbonFolder class="w-4 h-4 mr-2" />

        { $CurrentWorkspaceStore?.entities.get(folderId ?? "")?.title ?? "Workspace's Root" }
    </div>

    <CarbonChevronSort class="w-4 h-4 inline-block" />

    <!-- Input for form  -->
    <input type="text" name="location" bind:value={folderId} hidden>
</button>