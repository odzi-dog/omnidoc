<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { DocumentEditorContext } from "../../_context";
	import type { TextSectionPayload } from "./types";

    const dispatch = createEventDispatcher();
    let timer: NodeJS.Timeout;

    function handleOnInput(updatedContent: string) {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            DocumentEditorContext.updateSection(id, {
                content: updatedContent,
            });
        }, 500);
    };

    $: isEditable = $DocumentEditorContext.isEditable;
    
    export let id: string;
    export let payload: TextSectionPayload;
</script>

<div
    on:input={(event) => handleOnInput(event.target?.innerHTML ?? event.currentTarget.innerHTML)} 
    on:keypress={(event) => {
        if (event.key.toLowerCase() == "enter" && !event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            
            // Creating new section
            dispatch("addEmptySection");
        };
    }}
    class="text-gray-200 w-full my-2 outline-none" spellcheck="false" contenteditable={isEditable}>
    { @html payload.content }
</div>