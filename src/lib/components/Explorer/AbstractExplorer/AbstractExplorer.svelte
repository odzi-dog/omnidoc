<script lang="ts">
	import type { FlatWorkspaceDocument } from "$lib/database/entities";
	import type { MappedWorkspace } from "$lib/stores/Application";
	import { fade } from "svelte/transition";

    function documentTypeGuard(untyped: any) {
        // todo
        // check if it really is WorkspaceDocument type
        return untyped as FlatWorkspaceDocument;
    };

    export let folderComponent: any;
    export let documentComponent: any;
    export let entities: MappedWorkspace["entities"] = new Map();
</script>

<div in:fade class="w-full overflow-hidden">
    <!-- Root folders (circular) -->
    { #each [...entities] as [folder, contents] }
        { #if folder != null }
            <svelte:component this={folderComponent} {folder} {contents} />
        { /if }
    { /each }

    <!-- Root documents -->
    { #each entities.get(null) ?? [] as untypedDocument }
        { @const document = documentTypeGuard(untypedDocument) }

        <svelte:component this={documentComponent} {document} />
    { /each }
</div>