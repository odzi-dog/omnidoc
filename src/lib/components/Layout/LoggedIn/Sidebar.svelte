<script lang="ts">
    import CarbonBookmark from '~icons/carbon/bookmark';
    import CarbonGrid from '~icons/carbon/grid';

	import { RoundedIconButton } from '../../Buttons';
	import { ApplicationStore } from '$lib/stores/Application.store';
	import { CurrentWorkspaceStore } from '$lib/stores/Application';
	import { Placeholder } from '$lib/components/Loaders';
	import WorkspaceChooser from './Sidebar/WorkspaceChooser.svelte';
	import Avatar from '$lib/components/Images/Avatar.svelte';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { AbstractExplorer } from '$lib/components/AbstractExplorer';
	import Folder from './Sidebar/Folder.svelte';
	import Document from './Sidebar/Document.svelte';

    const user = getUser();

    let additionalClassNames: string = "";
    export { additionalClassNames as class };
</script>

<sidebar class="h-full flex flex-col bg-zinc-800 rounded-2xl p-1 pt-3 relative { additionalClassNames }">
    { #if $ApplicationStore.workspaces == null }
        <!-- Workspaces is loading -->
        <Placeholder class="w-full h-8" />
    { :else }
        <WorkspaceChooser />
    { /if }

    <!-- Content -->
    <div class="relative flex-grow mt-4 p-1 overflow-y-scroll">
        { #if $ApplicationStore.workspaces == null }
            <div class="flex items-center mt-4 gap-4">
                <Placeholder class="w-2/3 h-5" />
                <Placeholder class="w-1/3 h-5" />
            </div>

            <Placeholder class="w-full mt-4 h-5" />

            <div class="pl-10 mt-4">
                <Placeholder class="w-full h-5" />
            </div>
            
            <Placeholder class="w-full mt-4 h-5" />

            <div class="w-full relative">
                <!-- Overlay -->
                <div class="absolute w-full h-full z-20 bg-gradient-to-b from-transparent to-zinc-800"></div>

                <!-- Yeah -->
                { #each [1,2,3,4] as index }
                    { #if index % 2 == 1 }
                        <div class="flex items-center mt-4 gap-4">
                            <Placeholder class="w-2/3 h-5" />
                            <Placeholder class="w-1/3 h-5" />
                        </div>
                    { :else }
                        <Placeholder class="w-full mt-4 h-5" />
                    { /if }
                { /each }

                <Placeholder class="w-full mt-4 h-5" />
                
                <div class="pl-10 mt-4">
                    <Placeholder class="w-full h-5" />
                </div>
            </div>
        { :else }
            { #if $CurrentWorkspaceStore != null }
                <AbstractExplorer
                    rootEntities={ $CurrentWorkspaceStore.rootEntities }
                    entities={ $CurrentWorkspaceStore.entities } 
                    hierarchy={ $CurrentWorkspaceStore.hierarchy }

                    folderComponent={Folder} 
                    documentComponent={Document} 
                />
            { /if }
        { /if }
    </div>

    <!-- Account -->
    <div class="flex items-center gap-3 p-3">
        <!-- Profile icon -->
        <Avatar seed={$user?.username} type="initials" class="w-9 h-9 mr-[auto]" />

        { #each [
            { icon: CarbonBookmark }, 
            { icon: CarbonGrid }
        ] as button }
            <RoundedIconButton icon={button.icon} />
        { /each }
    </div>    
</sidebar>