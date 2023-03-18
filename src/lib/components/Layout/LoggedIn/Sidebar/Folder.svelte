<script lang="ts">
    import CarbonChevronRight from '~icons/carbon/chevron-right';
    import CarbonChevronDown from '~icons/carbon/chevron-down';

	import type { WorkspaceDocument, WorkspaceFolder } from "$lib/database/entities";
	import type { CircularEntity } from '$lib/stores/Application';
	import Document from './Document.svelte';
	import { Folder } from '.';
	import { onMount } from 'svelte';

    function documentTypedGuard(untyped: any) {
        return untyped as WorkspaceDocument;
    };

    let isChildrenShown = true;

    onMount(() => {
        isChildrenShown = localStorage.getItem(`isChildrenShown-${ folder.id }`) === 'true';
    });

    export let folder: WorkspaceFolder;
    export let contents: Array<CircularEntity> | undefined = [];
</script>

<div class="w-full my-1">
    <!-- Header -->
    <button class="
        flex items-center text-gray-400 w-full rounded-xl p-1 transition 
        hover:bg-zinc-700
    ">
        <!-- Entry type (folder/document) or emoji -->
        <button on:click={() => {
            isChildrenShown = !isChildrenShown;
            localStorage.setItem(`isChildrenShown-${ folder.id }`, String(isChildrenShown));
        }} class="
            p-1 rounded-full transition 
            hover:bg-zinc-600
        ">
            <svelte:component this={ isChildrenShown ? CarbonChevronDown : CarbonChevronRight } class="w-4 h-4" />
        </button>

        <h1 class="text-sm ml-1">{ folder.title }</h1>
    </button>

    <!-- Children -->
    { #if contents && isChildrenShown }
        <div class="pl-5">
            <div class="my-1">
                { #each contents as entity }
                    { #if entity instanceof Map }
                        { #each [...entity] as [folder, contents] }
                            { #if folder != null }
                                <svelte:component this={Folder} {folder} {contents} />
                            { /if }
                        { /each }
                    { :else if entity instanceof Object }
                        { @const document = documentTypedGuard(entity) }

                        <Document {document} />
                    { /if }
                { /each }
            </div>
        </div>
    { /if }
</div>