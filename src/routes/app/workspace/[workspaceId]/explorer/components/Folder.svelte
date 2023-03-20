<script lang="ts">
	import RoundedIconButton from "$lib/components/Buttons/RoundedIconButton.svelte";
	import type { FlatWorkspaceFolder } from "$lib/database/entities";
	import { getContext } from "svelte";
    import CarbonOverflowMenuVertical from '~icons/carbon/overflow-menu-vertical';
	import { Folder, Document } from ".";
	import { AbstractFolder, type AbstractFolderContents } from "$lib/components/AbstractExplorer";
	import { EXPLORER_CONTEXT_KEY, type ExplorerContext } from "../_context";
	import { scale } from "svelte/transition";

    const { updateCurrentFolder } = getContext<ExplorerContext>(EXPLORER_CONTEXT_KEY);

    function selectThisFolder() {
        updateCurrentFolder(folder.id);
    };

    export let folder: FlatWorkspaceFolder;
</script>

<AbstractFolder id={folder.id} folderComponent={Folder} documentComponent={Document}>
    <button in:scale on:click={() => {
        selectThisFolder();
    }} slot="header" class="w-full h-full group cursor-pointer">
        <!-- Folder visual header -->
        <div class="w-full flex">
            <span class="h-4 w-1/3 bg-zinc-800 group-hover:bg-zinc-700 transition rounded-t-2xl"></span>
        </div>

        <!-- Content -->
        <div class="bg-zinc-800 group-hover:bg-zinc-700 transition rounded-b-2xl rounded-r-2xl p-4 ">
            <!-- Header (with action buttons) -->
            <div class="w-full flex items-center justify-between">
                <!-- Folder icon -->
                <div class="rounded-full bg-zinc-700 border-2 border-zinc-600 p-2 text-gray-300">
                    <img src="https://em-content.zobj.net/thumbs/120/apple/325/dog_1f415.png" class="w-5 h-5" alt="">
                </div>

                <!-- Folder settings -->
                <RoundedIconButton icon={CarbonOverflowMenuVertical} />
            </div>

            <!-- Text -->
            <div class="text-left mt-4">
                <h1 class="text-md text-white">{ folder.title }</h1>
                <p class="text-sm text-gray-300">100 documents</p>
            </div>
        </div>
    </button>
</AbstractFolder>