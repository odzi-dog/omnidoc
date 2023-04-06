<script lang="ts">
    import CreateDocumentDialog from '$lib/components/Dialogs/Workspace/CreateDocumentDialog.svelte';
    import CarbonAdd from '~icons/carbon/add';

    export let folderId: string | null = null;
</script>

<CreateDocumentDialog let:setIsOpen {folderId}>
    <button class="
        flex items-center text-gray-400 w-full rounded-xl p-1 py-1.5 group transition opacity-50
        hover:bg-zinc-700 hover:opacity-100
    " on:click={() => setIsOpen(true)}>
        <CarbonAdd class="ml-1 w-4 h-4" />

        <h1 class="w-2/3 text-left text-sm ml-1 truncate overflow-hidden mr-[auto]">New document</h1>
    </button>
</CreateDocumentDialog>