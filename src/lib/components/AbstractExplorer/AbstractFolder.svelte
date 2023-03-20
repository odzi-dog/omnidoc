<script lang="ts">
	import type { FlatWorkspaceDocument } from "$lib/database/entities";
	import type { CircularEntity } from "$lib/stores/Application";
	import { onMount } from "svelte";
    
    let isChildrenShown = true;

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

    export let id: string = "";
    export let folderComponent: any;
    export let documentComponent: any;
    export let contents: Array<CircularEntity> | undefined = [];
</script>

<div class="w-full my-1">
    <!-- Header -->
    <slot name="header" {setIsShown} />

    <!-- Children -->
    { #if contents && isChildrenShown }
        <div class="pl-5">
            <div class="my-1">
                { #each contents as entity }
                    { #if entity instanceof Map }
                        { #each [...entity] as [folder, contents] }
                            { #if folder != null }
                                <svelte:component this={folderComponent} {folder} {contents} />
                            { /if }
                        { /each }
                    { :else if entity instanceof Object }
                        { @const document = documentTypedGuard(entity) }

                        <svelte:component this={documentComponent} {document} />
                    { /if }
                { /each }
            </div>
        </div>
    { /if }
</div>