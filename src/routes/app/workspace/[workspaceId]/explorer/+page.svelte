<script lang="ts">
    import CarbonNewTab from '~icons/carbon/new-tab';
	import { setContext } from 'svelte';
	import { AbstractExplorer } from '$lib/components/AbstractExplorer';
	import { EXPLORER_CONTEXT_KEY, type ExplorerContext } from './_context';
    import { CurrentWorkspaceStore, type HierarchyFolder, type MappedWorkspace } from "$lib/stores/Application";
	import { Folder, Document } from './components';
	import Placeholder from '$lib/components/Loaders/Placeholder.svelte';
	import CarbonFolder from '~icons/carbon/folder';
    import CarbonChevronRight from '~icons/carbon/chevron-right';
	import RoundedIconButton from '$lib/components/Buttons/RoundedIconButton.svelte';

    $: rootEntities = $CurrentWorkspaceStore?.rootEntities ?? [];

    // Returns array of ids of all parent folders, sorted from
    // root folder and back to our current folder
    function getFolderLocation(folderId: string): Array<string> {
        let currentFolder = $CurrentWorkspaceStore?.hierarchy.get(folderId);
        if (!currentFolder) return [];

        const location: Array<string> = [];

        while (currentFolder != null) {
            location.push(currentFolder?.id);
            currentFolder = $CurrentWorkspaceStore?.hierarchy.get(currentFolder?.folder ?? "");
        };

        return location.reverse();
    };

    // Context variables
    let currentFolder: ExplorerContext["currentFolder"] = null;

    // Context helper functions
    function updateContext() {
        setContext<ExplorerContext>(EXPLORER_CONTEXT_KEY, {
            currentFolder: currentFolder,
            ...getContextFunctions()
        });
    };

    function updateCurrentFolder(folderId: string | null) {
        currentFolder = folderId;

        // Getting this folder contents from our MappedWorkspace store
        const folder = $CurrentWorkspaceStore?.hierarchy.get(folderId ?? "");

        if (folder) {
            rootEntities = [
                ...folder.folders.map((folderId) => $CurrentWorkspaceStore?.entities.get(folderId)),
                ...folder.documents.map((documentId) => $CurrentWorkspaceStore?.entities.get(documentId)),
            ].filter((entity) => entity != undefined) as MappedWorkspace["rootEntities"];
        };

        updateContext();
    };

    function getContextFunctions() {
        return {
            updateCurrentFolder,
        }
    };

    updateContext();
</script>

<!-- Header -->
<div class="flex pt-4">
    <!-- Texts -->
    <div class="mr-[auto]">
        <h1 class="text-xl text-white">Documents</h1>
    </div>

    <!-- Buttons -->
    <button class="
        flex items-center px-5 py-1.5 rounded-xl bg-blue-500 text-white transition
        hover:bg-blue-700 hover:text-gray-100
    ">
        <CarbonNewTab class="h-4 w-4 mr-2" />

        <p class="text-sm font-medium">Create new document</p>
    </button>
</div>

<!-- Sub-header (with current folder path) -->
{ #if currentFolder }
    <div class="flex items-center">
        <RoundedIconButton on:click={() => {
            rootEntities = $CurrentWorkspaceStore?.rootEntities ?? [];
            updateCurrentFolder(null);
        }} style="dark" icon={CarbonFolder} class="text-gray-300 mr-4" />
        
        <!-- Hierarchy -->
        { #each getFolderLocation(currentFolder) as folderId }
            <button on:click={() => {
                updateCurrentFolder(folderId);
            }} class="
                p-2 flex rounded-xl items-center transition
                hover:bg-zinc-800
            ">
                <p class="text-gray-300 text-sm">{ $CurrentWorkspaceStore?.entities.get(folderId)?.title }</p>
            </button>

            { #if folderId != currentFolder }
                <CarbonChevronRight class="mx-0.5 w-4 h-4 text-gray-300" />
            { /if }
        { /each }
    </div>
{ /if }

{ #if $CurrentWorkspaceStore == null }
    <div class="grid grid-cols-5 gap-4 mt-8 relative">
        <!-- Overlay -->
        <div class="absolute w-full h-full z-20 bg-gradient-to-b from-transparent to-zinc-900"></div>

        { #each [1,2,3,4,5] as _ }
            <div class="w-full h-full">
                <!-- Folder visual header -->
                <div class="w-full flex">
                    <span class="h-4 w-1/3 bg-zinc-800 rounded-t-2xl"></span>
                </div>

                <!-- Content -->
                <div class="bg-zinc-800 rounded-b-2xl rounded-r-2xl p-4 ">
                    <!-- Header (with action buttons) -->
                    <div class="w-full flex items-center justify-between">
                        <!-- Folder icon -->
                        <Placeholder class="w-9 h-9 rounded-full" />

                        <!-- Folder settings -->
                        <Placeholder class="w-9 h-9 rounded-full" />
                    </div>

                    <!-- Text -->
                    <div class="mt-4">
                        <Placeholder class="w-full h-6" />
                        
                        <div class="flex mt-3 gap-4">
                            <Placeholder class="w-2/3 h-5" />
                            <Placeholder class="w-1/4 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        { /each }

        { #each [1,2,3,4,5,5,6,7] as _ }
            <div class="w-full pt-4">
                <!-- Content -->
                <div class="bg-zinc-800 rounded-2xl p-4 ">
                    <!-- Header (with action buttons) -->
                    <div class="w-full flex items-center justify-between">
                        <!-- Folder icon -->
                        <Placeholder class="w-9 h-9 rounded-full" />
            
                        <!-- Folder settings -->
                        <Placeholder class="w-9 h-9 rounded-full" />
                    </div>
            
                    <!-- Text -->
                    <div class="mt-4">
                        <Placeholder class="w-full h-6" />
                        
                        <div class="flex mt-3 gap-4">
                            <Placeholder class="w-2/3 h-5" />
                            <Placeholder class="w-1/4 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        { /each }
    </div>
{ :else }
    <AbstractExplorer
        rootEntities={rootEntities}
        entities={ $CurrentWorkspaceStore.entities }
        hierarchy={ $CurrentWorkspaceStore.hierarchy }
    
        folderComponent={Folder} 
        documentComponent={Document} 
        class="grid grid-cols-5 gap-4 mt-8"
    />
{ /if }