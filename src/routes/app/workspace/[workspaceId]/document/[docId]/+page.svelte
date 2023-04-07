<script lang="ts">
	import { fade } from 'svelte/transition';
    import type { PageData } from './$types';
	import { onMount, onDestroy } from 'svelte';

    import CarbonShare from '~icons/carbon/share';
    import CarbonStatusChange from '~icons/carbon/status-change';
    import CarbonSettings from '~icons/carbon/settings';
    import CarbonHome from '~icons/carbon/home';
    import CarbonChevronRight from '~icons/carbon/chevron-right';

    import { CurrentDocumentStore, CurrentWorkspaceStore } from '$lib/stores/Application';
    import { subscribe as subscribeToDocumentChanges, unsubscribe as unsubscribeFromDocumentChanges } from './_subscriptions';
	import type { Unsubscriber } from 'svelte/store';
	import { RoundedIconButton } from '$lib/components/Buttons';

    import * as SectionsImport from './sections';
	import { getFolderLocation, gotoWorkspacePage } from '$lib/helpers/workspace';
    const Sections = Object.values(SectionsImport);
    
    onMount(async () => {
        // Loading our document information into our CurrentDocumentStore
        CurrentDocumentStore.loadFromFlatObject(data);

        let unsubscribe: Unsubscriber;
        unsubscribe = CurrentDocumentStore.subscribe((object) => {
            if (object != null) {
                subscribeToDocumentChanges();
                if (unsubscribe != null) unsubscribe();
            };
        });
    });

    onDestroy(async () => {
        if ($CurrentDocumentStore != null) {
            await unsubscribeFromDocumentChanges();
        };

        CurrentDocumentStore.clear();
    });

    const sections = [
        {
            type: "text",
            payload: {
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae maiores officia at cumque velit mollitia iste, ut eius distinctio vero facilis omnis et adipisci quia illo quibusdam quisquam molestias consectetur eum eos quos. Veniam quibusdam ipsum molestiae nemo quod quis necessitatibus quisquam placeat, fuga, similique sit corporis illo dignissimos et vitae. Dignissimos voluptatem natus nulla incidunt, voluptas iusto nemo laudantium sit, deserunt facilis aliquid. Corporis maiores porro ipsum, est quisquam molestiae, iusto laborum consequatur impedit praesentium mollitia nemo quos eius! Incidunt unde excepturi quod consequuntur cumque accusantium! Repellat adipisci, suscipit velit magni tempore excepturi? Impedit cupiditate tempore rem ea!"
            },
        },
        {
            type: "text",
            payload: {
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae maiores officia at cumque velit mollitia iste, ut eius distinctio vero facilis omnis et adipisci quia illo quibusdam quisquam molestias consectetur eum eos quos. Veniam quibusdam ipsum molestiae nemo quod quis necessitatibus quisquam placeat, fuga, similique sit corporis illo dignissimos et vitae. Dignissimos voluptatem natus nulla incidunt, voluptas iusto nemo laudantium sit, deserunt facilis aliquid. Corporis maiores porro ipsum, est quisquam molestiae, iusto laborum consequatur impedit praesentium mollitia nemo quos eius! Incidunt unde excepturi quod consequuntur cumque accusantium! Repellat adipisci, suscipit velit magni tempore excepturi? Impedit cupiditate tempore rem ea!"
            },
        },
        {
            type: "text",
            payload: {
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae maiores officia at cumque velit mollitia iste, ut eius distinctio vero facilis omnis et adipisci quia illo quibusdam quisquam molestias consectetur eum eos quos. Veniam quibusdam ipsum molestiae nemo quod quis necessitatibus quisquam placeat, fuga, similique sit corporis illo dignissimos et vitae. Dignissimos voluptatem natus nulla incidunt, voluptas iusto nemo laudantium sit, deserunt facilis aliquid. Corporis maiores porro ipsum, est quisquam molestiae, iusto laborum consequatur impedit praesentium mollitia nemo quos eius! Incidunt unde excepturi quod consequuntur cumque accusantium! Repellat adipisci, suscipit velit magni tempore excepturi? Impedit cupiditate tempore rem ea!"
            },
        }
    ]

    export let data: PageData;
</script>

<div in:fade class="w-full h-full pt-4">
    <!-- Header -->
    <header class="w-full flex items-center justify-between">

        <div class="flex items-center">
            <RoundedIconButton on:click={() => {
                gotoWorkspacePage("/explorer");
            }} style="dark" icon={CarbonHome} class="text-gray-300 mr-4" />
            
            <!-- Hierarchy -->
            { #if data.folder }
                { #each getFolderLocation($CurrentWorkspaceStore?.hierarchy ?? new Map(), data.folder) as folderId }
                    <button class="
                        p-2 flex rounded-xl items-center transition
                        hover:bg-zinc-800
                    ">
                        <p class="text-gray-300 text-sm">{ $CurrentWorkspaceStore?.entities.get(folderId)?.title }</p>
                    </button>
        
                    { #if folderId != data.folder }
                        <CarbonChevronRight class="mx-0.5 w-4 h-4 text-gray-300" />
                    { /if }
                { /each }
            { /if }
        </div>

        <!-- Control buttons -->
        <div class="flex items-center gap-2">
            <!-- History -->
            <RoundedIconButton icon={CarbonStatusChange} />
            
            <!-- Share -->
            <RoundedIconButton icon={CarbonShare} />

            <!-- More settings -->
            <RoundedIconButton icon={CarbonSettings} />
        </div>
    </header>

    <!-- Document content -->
    <div class="p-12">
        <!-- Document header section -->
        <section class="mb-8">
            <h1 class="text-4xl text-white">{ data.title }</h1>
            <p class="text-md text-gray-400">Lorem ipsum dolor sit amet.</p>
        </section>

        <!-- All other document sections -->
        { #each sections as section }
            { @const SectionComponent = Sections.find((x) => x.type == section.type) }
        
            { #if SectionComponent != null }
                <svelte:component this={SectionComponent.component} payload={section.payload} />
            { /if }
        { /each }
    </div>
</div>