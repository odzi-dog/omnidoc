<script lang="ts">
    import CarbonChevronRight from '~icons/carbon/chevron-right';
    import CarbonChevronDown from '~icons/carbon/chevron-down';

	import type { FlatWorkspaceFolder } from "$lib/database/entities";
	
    import Document from './Document.svelte';
	import { AbstractFolder, type AbstractFolderContents } from '$lib/components/AbstractExplorer';
	import { Folder } from '.';

    let isChildrenShown = true;

    export let folder: FlatWorkspaceFolder;
    export let contents: AbstractFolderContents;
</script>

<AbstractFolder bind:isChildrenShown let:setIsShown {contents} id={folder.id} folderComponent={Folder} documentComponent={Document}>
    <!-- Header -->
    <button slot="header" class="
        flex items-center text-gray-400 w-full rounded-xl p-1 transition 
        hover:bg-zinc-700
    ">
        <!-- Entry type (folder/document) or emoji -->
        <button on:click={() => {
            setIsShown(!isChildrenShown);
        }} class="
            p-1 rounded-full transition 
            hover:bg-zinc-600
        ">
            <svelte:component this={ isChildrenShown ? CarbonChevronDown : CarbonChevronRight } class="w-4 h-4" />
        </button>

        <h1 class="text-sm ml-1">{ folder.title }</h1>
    </button>
</AbstractFolder>