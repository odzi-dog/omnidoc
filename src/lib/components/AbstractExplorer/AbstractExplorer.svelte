<script lang="ts">
	import EntityType from "$lib/database/entities/EntityType";
    import type { HierarchyFolder, MappedWorkspace, Folder } from "$lib/stores/Application";
	import { setContext } from "svelte";
	import { fade } from "svelte/transition";
	import { ABSTRACT_EXPLORER_CONTEXT_KEY, type AbstractExplorerContext } from "./AbstractExplorerContext";
	import type { AbstractFolderContents } from "./AbstractFolderTypes";

    function folderTypeGuard(folder: any) {
        return folder as HierarchyFolder;
    };

    function getFolderContents(folderId: string) {
        const folder = hierarchy.get(folderId);
        if (!folder) return [];
        
        return [
            ...folder.documents.map((documentId) => entities.get(documentId)),
            ...folder.folders.map((folderId) => entities.get(folderId)),
        ].filter((entity) => entity != undefined) as AbstractFolderContents;
    };

    setContext<AbstractExplorerContext>(ABSTRACT_EXPLORER_CONTEXT_KEY, {
        getFolderContents(folder) {
            return getFolderContents(folder.id);
        },
    })

    let additionalContainerClasses: string = ""

    export { additionalContainerClasses as class };
    export let folderComponent: any;
    export let documentComponent: any;

    export let rootEntities: MappedWorkspace["rootEntities"] = [];
    export let entities: MappedWorkspace["entities"] = new Map();
    export let hierarchy: MappedWorkspace["hierarchy"] = new Map();
</script>

<div in:fade class="w-full { additionalContainerClasses }">
    <!-- Root documents -->
    { #each rootEntities as entity }
        { #if entity.type == EntityType.DOCUMENT }
            <svelte:component this={documentComponent} document={entity} />
        { :else if entity.type == EntityType.FOLDER }
            <!-- urgh -->
            { @const folder = folderTypeGuard(entity) }

            <svelte:component this={folderComponent} folder={entity} contents={getFolderContents(folder.id)} />
        { /if }
    { /each }
</div>