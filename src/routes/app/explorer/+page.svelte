<script lang="ts">
    import RoundedIconButton from '$lib/components/Buttons/RoundedIconButton.svelte';
    import CarbonNewTab from '~icons/carbon/new-tab';
    import CarbonDocument from '~icons/carbon/document';
    import CarbonOverflowMenuVertical from '~icons/carbon/overflow-menu-vertical';
</script>

<!-- Header -->
<div class="flex">
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

<div class="grid grid-cols-5 auto-rows-auto gap-4 mt-8">
    <!-- Folder document -->
    <div class="w-full h-full group cursor-pointer">
        <!-- Folder visual header -->
        <div class="w-full flex">
            <span class="h-4 w-1/3 bg-zinc-800 group-hover:bg-zinc-700 transition rounded-t-2xl"></span>
        </div>

        <!-- Content -->
        <div class="bg-zinc-800 group-hover:bg-zinc-700 transition rounded-b-2xl rounded-r-2xl p-4 ">
            <!-- Header (with action buttons) -->
            <div class="w-full flex items-center justify-between">
                <!-- Folder icon -->
                <div class="rounded-full bg-zinc-700 border-2 border-zinc-600 p-2 text-gray-300">
                    <img src="https://em-content.zobj.net/thumbs/120/apple/325/dog_1f415.png" class="w-5 h-5" alt="">
                </div>

                <!-- Folder settings -->
                <RoundedIconButton icon={CarbonOverflowMenuVertical} />
            </div>

            <!-- Text -->
            <div class="mt-4">
                <h1 class="text-md text-white">Games folder</h1>
                <p class="text-sm text-gray-300">100 documents</p>
            </div>
        </div>
    </div>

    <!-- Text Document -->
    <div class="w-full group pt-4">
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
            <div class="mt-4">
                <h1 class="text-md text-white">Document</h1>
                <p class="text-sm text-gray-300">Updated yesterday</p>
            </div>
        </div>
    </div>
</div>