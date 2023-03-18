<script lang="ts">
    import CarbonBookmark from '~icons/carbon/bookmark';
    import CarbonGrid from '~icons/carbon/grid';

	import { RoundedIconButton } from '../../Buttons';
	import { ApplicationStore } from '$lib/stores/Application.store';
	import { CurrentWorkspaceStore, EntityType } from '$lib/stores/Application';
	import { Placeholder } from '$lib/components/Loaders';
	import WorkspaceChooser from './Sidebar/WorkspaceChooser.svelte';
	import Avatar from '$lib/components/Images/Avatar.svelte';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import type { WorkspaceDocument } from '$lib/database/entities';
	import Document from './Sidebar/Document.svelte';
	import Folder from './Sidebar/Folder.svelte';
	import { fade } from 'svelte/transition';

    function documentTypeGuard(untyped: any): WorkspaceDocument {
        // todo
        // check if it really is WorkspaceDocument type
        return untyped as WorkspaceDocument;
    };

    const user = getUser();

    let additionalClassNames: string = "";
    export { additionalClassNames as class };
</script>

<sidebar class="h-full flex flex-col bg-zinc-800 rounded-2xl p-1 pt-3 relative { additionalClassNames }">
    { #if $ApplicationStore.workspaces == null }
        <!-- Workspaces is loading -->
        <Placeholder class="w-full h-10" />
    { :else }
        <WorkspaceChooser />
    { /if }

    <!-- Content -->
    <div class="relative flex-grow mt-4 p-1 overflow-y-scroll">
        { #if $CurrentWorkspaceStore != null }
            <div in:fade class="w-full overflow-hidden">
                <!-- Root folders (circular) -->
                <!-- .filter(([key, value]) => key != null) does not work(( -->
                { #each [...$CurrentWorkspaceStore.entities] as [folder, contents] }
                    { #if folder != null }
                        <Folder {folder} {contents} />
                    { /if }
                { /each }

                <!-- Root documents -->
                { #each $CurrentWorkspaceStore.entities.get(null) ?? [] as untypedDocument }
                    { @const document = documentTypeGuard(untypedDocument) }

                    <Document {document} />
                { /each }
            </div>
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