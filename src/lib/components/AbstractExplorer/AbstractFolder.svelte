<script lang="ts">
	import type { FlatWorkspaceDocument } from "$lib/database/entities";
	import { getContext, onMount } from "svelte";
    import type { Document, Folder } from "$lib/stores/Application";
	import type { AbstractFolderContents } from "./AbstractFolderTypes";
    import EntityType from "$lib/database/entities/EntityType";
	import { ABSTRACT_EXPLORER_CONTEXT_KEY, type AbstractExplorerContext } from "./AbstractExplorerContext";

    let isChildrenShown = true;

    const { getFolderContents } = getContext<AbstractExplorerContext>(ABSTRACT_EXPLORER_CONTEXT_KEY);

    function documentTypedGuard(untyped: any) {
        return untyped as FlatWorkspaceDocument;
    };

    function setIsShown(isShown: boolean) {
        isChildrenShown = isShown;
        localStorage.setItem(`isChildrenShown-${ id }`, String(isShown));
    };
    
    onMount(() => {
        isChildrenShown = localStorage.getItem(`isChildrenShown-${ id }`) === 'true';
    });

    export { isChildrenShown };

    export let afterFolderContentsComponent: any | null = null;

    export let id: string = "";
    export let folderComponent: any;
    export let documentComponent: any;
    export let contents: AbstractFolderContents = [];
</script>

<div class="w-full my-1">
    <!-- Header -->
    { #key id }
        <slot name="header" {setIsShown} />
    { /key }

    <!-- Children -->
    { #if isChildrenShown }
        <div class="pl-5">
            { #if contents.length > 0 }
                <div class="my-1">
                    { #each contents as entity }
                        { #if entity.type == EntityType.FOLDER }
                            <svelte:component this={folderComponent} folder={entity} contents={getFolderContents(entity)} {afterFolderContentsComponent} />
                        { :else if entity.type == EntityType.DOCUMENT }
                            { @const document = documentTypedGuard(entity) }

                            <svelte:component this={documentComponent} {document} />
                        { /if }
                    { /each }
                </div>
            { /if }

            { #if afterFolderContentsComponent != null }
                <svelte:component this={afterFolderContentsComponent} folderId={id} />
            { /if }
        </div>
    { /if }
</div>