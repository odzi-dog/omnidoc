<script lang="ts">
    import CarbonDocument from '~icons/carbon/document';
    
	import type { WorkspaceDocument } from "$lib/database/entities";

    export let document: WorkspaceDocument;
</script>

<div class="w-full my-1">
    <!-- Header -->
    <button class="
        flex items-center text-gray-400 w-full rounded-xl p-1 transition 
        hover:bg-zinc-700
    ">
        <!-- Entry type (folder/document) or emoji -->
        <CarbonDocument class="m-1 w-4 h-4" />
        
        <h1 class="text-sm ml-1 truncate overflow-hidden">{ document.title }</h1>
    </button>
</div>