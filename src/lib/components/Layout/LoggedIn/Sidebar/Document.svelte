<script lang="ts">
    import CarbonDocument from '~icons/carbon/document';
    import CarbonOverflowMenuVertical from '~icons/carbon/overflow-menu-vertical';
    import CarbonTrashCan from '~icons/carbon/trash-can';
    import CarbonShare from '~icons/carbon/share';
    import CarbonStatusChange from '~icons/carbon/status-change';

    import type { DocumentHandler } from '$lib/stores/Application/EntityHandlers';
    import {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
    } from "@rgossiaux/svelte-headlessui";
	import { fade } from 'svelte/transition';
	import { gotoWorkspacePage } from '$lib/helpers/workspace';
	import { CurrentDocumentStore } from '$lib/stores/Application';

    export let document: DocumentHandler;
</script>

<div class="w-full my-1">
    <!-- Header -->
    <button class="
        flex items-center text-gray-400 w-full rounded-xl p-1 group transition 
        { $CurrentDocumentStore?.document.id == document.id ? "bg-zinc-700 hover:bg-zinc-600" : "hover:bg-zinc-700" }
    " on:click={() => {
        gotoWorkspacePage(`/document/${ document.id }`);
    }}>
        <!-- Entry type (folder/document) or emoji -->
        <CarbonDocument class="m-1 w-4 h-4" />
        
        <h1 class="w-2/3 text-left text-sm ml-1 truncate overflow-hidden mr-[auto]">{ document.title }</h1>

        <!-- Settings panel -->
        <Menu let:open>
            { #if open }
                <div transition:fade class="fixed top-0 right-0 z-10 w-full h-screen bg-opacity-30 bg-black">
                </div>
            { /if }

            <div in:fade>
                <MenuButton class="group-hover:opacity-100 opacity-0 mr-1 rounded-full hover:bg-zinc-600 p-1">
                    <CarbonOverflowMenuVertical class="w-5 h-5 text-gray-300" />
                </MenuButton>
            </div>

            { #if open }
                <div transition:fade={{ duration: 100 }}>
                    <MenuItems class="absolute z-20 left-[0] w-[100%] pt-2 px-0.5">
                        <div class="rounded-2xl shadow-xl bg-zinc-900 px-2 pt-2 border-2 border-zinc-700">
                            <!-- Full file name -->
                            <h1 class="text-base text-gray-300 text-left px-2">{ document.title }</h1>

                            <!-- Some stats -->
                            <div class="mt-1 px-2">
                                <!-- Update date -->
                                <div class="my-1 flex items-center">
                                    <p class="text-xs">Updated yesterday</p>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="mt-2">
                                <!-- Share -->
                                <button on:click|preventDefault|stopPropagation={() => {
                                    // todo
                                    // open popover with this page
                                    gotoWorkspacePage(`/document/${ document.id }/share`);
                                }} class="w-full my-2 rounded-2xl hover:bg-zinc-700 flex items-center px-2 py-1.5 transition">
                                    <CarbonShare class="w-4 h-4" />

                                    <p class="text-sm ml-2">Share</p>
                                </button>

                                <!-- History -->
                                <button on:click|preventDefault|stopPropagation={() => {
                                    gotoWorkspacePage(`/document/${ document.id }/history`);
                                }} class="w-full my-2 rounded-2xl hover:bg-zinc-700 flex items-center px-2 py-1.5 transition">
                                    <CarbonStatusChange class="w-4 h-4" />

                                    <p class="text-sm ml-2">History</p>
                                </button>

                                <div class="w-full my-2 px-2">
                                    <div class="w-full h-[1px] opacity-50 rounded-full bg-zinc-600"></div>
                                </div>
                                
                                <!-- Delete -->
                                <button on:click|preventDefault|stopPropagation={async () => {
                                    await document.delete();
                                }} class="w-full my-2 rounded-2xl hover:bg-red-700 hover:bg-opacity-10 text-red-500 hover:text-red-700 flex items-center px-2 py-1.5 transition">
                                    <CarbonTrashCan class="w-4 h-4" />

                                    <p class="text-sm ml-2">Delete</p>
                                </button>
                            </div>
                        </div>
                    </MenuItems>
                </div>
            { /if }
        </Menu>
    </button>
</div>