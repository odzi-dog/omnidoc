<script lang="ts">
    import CarbonChevronSort from '~icons/carbon/chevron-sort';
    import CarbonBookmark from '~icons/carbon/bookmark';
    import CarbonGrid from '~icons/carbon/grid';
    import CarbonDocument from '~icons/carbon/document';
    import CarbonChevronRight from '~icons/carbon/chevron-right';
    import CarbonFolder from '~icons/carbon/folder';
    import CarbonChevronDown from '~icons/carbon/chevron-down';

	import { RoundedIconButton } from '../../Buttons';
</script>

<sidebar class="h-full flex flex-col bg-zinc-800 w-1/6 rounded-2xl p-1 relative">
    <!-- Workspace -->
    <!-- <button class="flex items-center rounded-2xl hover:bg-zinc-700 transition p-3">
        Icon
        <div class="w-8 h-8 rounded-full bg-red-500 mr-3"></div>
 
        Texts
        <div class="mr-[auto] text-white">
            <h1 class="text-base font-medium">Playbox</h1>
            <p></p>
        </div>

        Choose other icon
        <CarbonChevronSort class="w-5 h-5 text-gray-300" />
    </button> -->

    <!-- Content -->
    <div class="flex-grow p-1">
        <!-- Documents -->
        <div>
            <!-- Header -->
            <div class="p-2 flex items-center opacity-70 text-gray-300">
                <h1 class="text-xs uppercase font-medium">Documents</h1>
            </div>

            <!-- Documents list -->
            <div>
                <!-- list entry -->
                <div class="my-1">
                    <!-- Header -->
                    <button class="
                        flex items-center text-gray-300 w-full rounded-xl p-1 transition 
                        hover:bg-zinc-700
                    ">
                        <!-- Entry type (folder/document) or emoji -->
                        <button class="
                            p-1 rounded-full transition 
                            hover:bg-zinc-600
                        ">
                            <CarbonChevronRight class="w-4 h-4" />
                        </button>

                        <h1 class="text-md ml-1">🎮 Games folder</h1>
                    </button>

                    <!-- Children -->
                </div>

                <!-- Document -->
                <div class="my-1">
                    <!-- Header -->
                    <button class="
                        flex items-center text-gray-300 w-full rounded-xl p-1 transition 
                        hover:bg-zinc-700
                    ">
                        <!-- Entry type (folder/document) or emoji -->
                        <CarbonDocument class="m-1 w-4 h-4" />
                        
                        <h1 class="text-md ml-1">Document</h1>
                    </button>

                    <!-- Children -->
                </div>

                <!-- List entry with children -->
                <div class="my-1">
                    <!-- Header -->
                    <button class="
                        flex items-center text-gray-300 w-full rounded-xl p-1 transition 
                        hover:bg-zinc-700
                    ">
                        <!-- Entry type (folder/document) or emoji -->
                        <button class="
                            p-1 rounded-full transition 
                            hover:bg-zinc-600
                        ">
                            <CarbonChevronDown class="w-4 h-4" />
                        </button>

                        <h1 class="text-md ml-1">✨ Subfolder</h1>
                    </button>

                    <!-- Children -->
                    <div class="pl-5">
                        <div class="my-1">
                            <!-- Header -->
                            <button class="
                                flex items-center text-gray-300 w-full rounded-xl p-1 transition 
                                hover:bg-zinc-700
                            ">
                                <!-- Entry type (folder/document) or emoji -->
                                <CarbonDocument class="m-1 sw-4 h-4" />
        
                                <h1 class="text-md ml-1">Not games</h1>
                            </button>
        
                            <!-- Children -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- Favourites -->
    </div>

    <!-- Account -->
    <div class="flex items-center gap-3 p-3">
        <!-- Profile icon -->
        <div class="rounded-full bg-red-500 w-9 h-9 mr-[auto]"></div>
    
        { #each [
            { icon: CarbonBookmark }, 
            { icon: CarbonGrid }
        ] as button }
            <RoundedIconButton icon={button.icon} />
        { /each }
    </div>    
</sidebar>