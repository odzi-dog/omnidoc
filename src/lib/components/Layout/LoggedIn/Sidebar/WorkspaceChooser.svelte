<script lang="ts">
    import CarbonGrid from '~icons/carbon/grid';
    import CarbonChevronSort from '~icons/carbon/chevron-sort';
    import CarbonChooseItem from '~icons/carbon/choose-item';
    import CarbonAdd from '~icons/carbon/add';
    import CarbonSettings from '~icons/carbon/settings';
    import CarbonList from '~icons/carbon/list';

	import { CurrentWorkspaceStore } from "$lib/stores/Application";
    import {
        Popover,
        PopoverButton,
        PopoverOverlay,
        PopoverPanel,
    } from "@rgossiaux/svelte-headlessui";
	import { ApplicationStore } from '$lib/stores/Application.store';
	import SolidButton from '$lib/components/Buttons/SolidButton.svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { gotoWorkspacePage } from '$lib/helpers/workspace';
	import Avatar from '$lib/components/Images/Avatar.svelte';
</script>

<!-- Workspace -->
<Popover let:open let:close>
    { #if open }
        <div transition:fade>
            <PopoverOverlay class="fixed top-0 right-0 z-10 w-full h-screen bg-opacity-30 bg-black" />
        </div>
    { /if }

    <PopoverButton class="relative w-full flex items-center rounded-2xl hover:bg-zinc-700 transition px-3 py-1.5">
        <!-- Icon -->
        { #if $CurrentWorkspaceStore == null }
            <CarbonGrid class="w-5 h-5 my-2 text-gray-300" />
        { :else }
            <Avatar src={$CurrentWorkspaceStore.avatar} seed={$CurrentWorkspaceStore.id} />
        { /if }

        <!-- Texts -->
        <div class="mr-[auto] text-white text-left ml-2 w-2/3">
            <h1 class="text-sm truncate">{ $CurrentWorkspaceStore?.title ?? "Workspaces" }</h1>

            { #if $CurrentWorkspaceStore != null }
                <p class="text-xs text-gray-400 truncate">1 new change</p>
            { /if }
        </div>

        <!-- Choose other icon -->
        <CarbonChevronSort class="w-5 h-5 text-gray-300" />
    </PopoverButton>

    { #if open }
        <div transition:fade={{ duration: 100 }}>
            <PopoverPanel class="absolute z-20 w-[150%] pt-2">
                <div class="rounded-2xl shadow-xl bg-zinc-900 pt-4 border-2 border-zinc-700">
                    <!-- Pinned workspaces -->
                    <div class="px-2">
                        <div class="flex items-center">
                            <p class="text-xs text-gray-400 font-medium uppercase mx-2">Pined</p>
                            
                            <span class="rounded-full bg-blue-500 opacity-80 px-2 text-white text-xs">
                                Soon
                            </span>
                        </div>

                        <div class="w-full text-center py-4">
                            <h1 class="text-sm text-gray-300">No pinned workspaces</h1>
                        </div>
                    </div>
                    
                    <!-- All workspaces -->
                    <div class="mt-2 px-2">
                        <p class="text-xs text-gray-400 font-medium uppercase mx-2">All</p>

                        { #each $ApplicationStore.workspaces ?? [] as workspace }
                            { @const isCurrentWorkspace = workspace.id == $CurrentWorkspaceStore?.id }
                            
                            <button on:click={() => {
                                goto(`/app/workspace/${ workspace.id }/explorer`);
                                close(null);
                            }} class="relative w-full my-2 flex items-center rounded-2xl { isCurrentWorkspace ? "hover:bg-zinc-700 bg-zinc-800" : "hover:bg-zinc-800" } transition px-3 py-1.5">
                                <Avatar src={workspace.avatar} seed={workspace.id} />

                                <div class="mr-[auto] text-left ml-2 w-2/3">
                                    <h1 class="text-sm text-white truncate">{ workspace.title }</h1>
                                    <p class="text-xs text-gray-300">1 new change</p>
                                </div>

                                { #if !isCurrentWorkspace }
                                    <CarbonChooseItem class="w-5 h-5 text-gray-300" />
                                { :else }
                                    <button on:click|preventDefault|stopPropagation={() => {
                                        gotoWorkspacePage("/settings");
                                        close(null);
                                    }} class="absolute flex items-center hover:bg-zinc-600 rounded-r-2xl transition px-4 right-0 h-full">
                                        <CarbonSettings class="w-5 h-5 text-gray-300" />
                                    </button>
                                { /if }
                            </button>
                        { /each }

                        <!-- Show all workspaces -->
                        <button on:click={() => {
                            goto(`/app/workspaces`);
                            close(null);
                        }} class="relative w-full my-2 flex items-center rounded-2xl hover:bg-zinc-800 transition px-3 py-1.5">
                            <CarbonList class="w-5 h-5 mx-1.5 text-gray-300" />
                            
                            <div class="text-left ml-2">
                                <h1 class="text-sm text-white truncate">Show all workspaces</h1>
                                <p class="text-xs text-gray-300">{ $ApplicationStore.workspaces?.length } workspaces in total</p>
                            </div>
                        </button>
                    </div>

                    <!-- Action buttons -->
                    <div class="w-full rounded-b-2xl bg-zinc-800 mt-4 py-4 px-2">
                        <SolidButton class="w-full justify-center text-white">
                            <CarbonAdd class="w-5 h-5 mr-1" />

                            <p>Create new workspace</p>
                        </SolidButton>
                    </div>
                </div>
            </PopoverPanel>
        </div>
    { /if }
</Popover>