<script lang="ts">
	import type { DocumentHandler } from "$lib/stores/Application/EntityHandlers";
    import CarbonDocument from '~icons/carbon/document';
    import CarbonOverflowMenuVertical from '~icons/carbon/overflow-menu-vertical';
    import RoundedIconButton from '$lib/components/Buttons/RoundedIconButton.svelte';
	import { scale } from "svelte/transition";
	import { gotoWorkspacePage } from "$lib/helpers/workspace";

    export let document: DocumentHandler;
</script>

{ #key document.id }
    <button on:click={() => {
        gotoWorkspacePage(`/document/${ document.id }`);
    }} in:scale class="w-full group pt-4">
        <!-- Content -->
        <div class="bg-zinc-800 group-hover:bg-zinc-700 transition rounded-2xl p-4 ">
            <!-- Header (with action buttons) -->
            <div class="w-full flex items-center justify-between">
                <!-- Folder icon -->
                <div class="rounded-full bg-zinc-700 border-2 border-zinc-600 p-2 text-gray-300">
                    <CarbonDocument class="w-5 h-5" />
                </div>

                <!-- Folder settings -->
                <RoundedIconButton icon={CarbonOverflowMenuVertical} />
            </div>

            <!-- Text -->
            <div class="mt-4 text-left">
                <h1 class="text-md text-white">{ document.title }</h1>
                <p class="text-sm text-gray-300">Updated yesterday</p>
            </div>
        </div>
    </button>
{ /key }