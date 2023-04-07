<script lang="ts">
    import {
        Dialog,
        DialogOverlay,
        DialogTitle,
        DialogDescription,
    } from "@rgossiaux/svelte-headlessui";
	import { fade, fly, slide } from "svelte/transition";
    import CarbonClose from '~icons/carbon/close';
    import CarbonDocumentAdd from '~icons/carbon/document-add';
    import CarbonDocument from '~icons/carbon/document';
	import FolderChooser from "./CreateDocumentDialog/FolderChooser.svelte";
	import { CurrentDocumentStore, CurrentWorkspaceStore } from "$lib/stores/Application";
	import { enhance } from "$app/forms";
	import type { ActionResult } from "@sveltejs/kit";

    function setIsOpen(value: boolean) {
        isOpen = value;
    };

    async function handleFormResults(result: ActionResult) {
        if (result.status != 200) {
            // todo
            // error handling
        } else {
            // Closing this modal window
            setIsOpen(false);
        };
    };

    export let isOpen = false;
    export let folderId: string | null = null;
</script>

<slot {isOpen} {setIsOpen} />

<Dialog open={isOpen} on:close={() => (isOpen = false)} class="fixed z-40 inset-0 flex items-center">
    <div transition:fade>
        <DialogOverlay class="fixed inset-0 w-full h-full z-30 bg-opacity-30 bg-black" />
    </div>

    <div transition:fly={{ duration: 400, x: -200 }} class="flex flex-col z-40 w-1/3 rounded-r-2xl shadow-xl bg-zinc-900 h-screen pt-4 border-2 border-zinc-700">
        <div class="px-4 mt-6">
            <DialogTitle class="text-white text-xl">Create new document</DialogTitle>
            <DialogDescription class="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delectus.</DialogDescription>

            <!-- Document creation form -->
            <form id="document_creation" action={ `/app/workspace/${ $CurrentWorkspaceStore?.id }?/createDocument` } method="POST" class="mt-10"
                use:enhance={() => {
                    return (response) => {
                        handleFormResults(response.result);
                    };
                }}
            >
                <label for="title" class="block text-xs uppercase text-gray-400">Document name</label>
                
                <div class="w-full relative flex items-center mt-2 mb-8 rounded-xl bg-zinc-800 py-2 px-3">
                    <CarbonDocument class="w-5 h-5 text-gray-400 mr-2" />
                    
                    <input name="title" type="text" placeholder="Name" class="text-white w-full bg-zinc-800" />
                </div>

                <!-- Document location -->
                <label for="location_chooser" class="text-xs uppercase text-gray-400">Document location</label>

                <FolderChooser {folderId} />
            </form>
        </div>

        <!-- Bottom panel -->
        <div class="w-full flex-grow flex gap-2 items-end justify-end p-4">
            <!-- Cancel button -->
            <button class="flex items-center text-gray-400 rounded-full px-4 py-1.5 transition hover:bg-zinc-800"
                on:click={() => (isOpen = false)}
            >
                <CarbonClose class="w-4 h-4" />

                <p class="ml-1.5 text-base">Cancel</p>
            </button>

            <!-- Create document -->
            <button type="submit" form="document_creation" class="
                flex items-center px-5 py-1.5 rounded-full bg-blue-500 text-white transition
                hover:bg-blue-700 hover:text-gray-100
            ">
                <CarbonDocumentAdd class="h-4 w-4 mr-2" />
    
                <p class="text-sm font-medium">Create new document</p>
            </button>
        </div>
    </div>
</Dialog>