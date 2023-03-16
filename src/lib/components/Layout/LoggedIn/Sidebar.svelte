<script lang="ts">
    import CarbonBookmark from '~icons/carbon/bookmark';
    import CarbonGrid from '~icons/carbon/grid';
    import CarbonDocument from '~icons/carbon/document';
    import CarbonChevronRight from '~icons/carbon/chevron-right';
    import CarbonChevronDown from '~icons/carbon/chevron-down';
    import CarbonNewTab from '~icons/carbon/new-tab';
    
	import { RoundedIconButton } from '../../Buttons';
	import { ApplicationStore } from '$lib/stores/Application.store';
	import { CurrentWorkspaceStore } from '$lib/stores/Application';
	import { Placeholder } from '$lib/components/Loaders';
	import WorkspaceChooser from './Sidebar/WorkspaceChooser.svelte';
</script>

<sidebar class="h-full flex flex-col bg-zinc-800 w-1/6 rounded-2xl p-1 pt-3 relative">
    { #if $ApplicationStore.workspaces == null }
        <!-- Workspaces is loading -->
        <Placeholder class="w-full h-10" />
    { :else }
        <WorkspaceChooser />
    { /if }

    <!-- Content -->
    <div class="flex-grow mt-4 p-1">
        { #if $CurrentWorkspaceStore != null }
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
                            flex items-center text-gray-400 w-full rounded-xl p-1 transition 
                            hover:bg-zinc-700
                        ">
                            <!-- Entry type (folder/document) or emoji -->
                            <button class="
                                p-1 rounded-full transition 
                                hover:bg-zinc-600
                            ">
                                <CarbonChevronRight class="w-4 h-4" />
                            </button>

                            <h1 class="text-sm">🎮 Games folder</h1>
                        </button>

                        <!-- Children -->
                    </div>

                    <!-- Document -->
                    <div class="my-1">
                        <!-- Header -->
                        <button class="
                            flex items-center text-gray-400 w-full rounded-xl p-1 transition 
                            hover:bg-zinc-700
                        ">
                            <!-- Entry type (folder/document) or emoji -->
                            <CarbonDocument class="m-1 w-4 h-4" />
                            
                            <h1 class="text-sm">Document</h1>
                        </button>

                        <!-- Children -->
                    </div>

                    <!-- List entry with children -->
                    <div class="my-1">
                        <!-- Header -->
                        <button class="
                            flex items-center text-gray-400 w-full rounded-xl p-1 transition 
                            hover:bg-zinc-700
                        ">
                            <!-- Entry type (folder/document) or emoji -->
                            <button class="
                                p-1 rounded-full transition 
                                hover:bg-zinc-600
                            ">
                                <CarbonChevronDown class="w-4 h-4" />
                            </button>

                            <h1 class="text-sm">✨ Subfolder</h1>
                        </button>

                        <!-- Children -->
                        <div class="pl-5">
                            <div class="my-1">
                                <!-- Header -->
                                <button class="
                                    flex items-center text-gray-400 w-full rounded-xl p-1 transition 
                                    hover:bg-zinc-700
                                ">
                                    <!-- Entry type (folder/document) or emoji -->
                                    <CarbonDocument class="m-1 sw-4 h-4" />
            
                                    <h1 class="text-sm">Not games</h1>
                                </button>
            
                                <!-- Children -->
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Add new page -->
                <button class="
                    mt-5 flex items-center text-gray-400 w-full rounded-xl p-1 transition 
                    hover:bg-zinc-700
                ">
                    <CarbonNewTab class="m-1 w-4 h-4" />

                    <h1 class="text-sm ml-1">New document</h1>
                </button>
            </div>
        { /if }
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