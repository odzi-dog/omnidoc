<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { DocumentEditorContext } from "../../_context";
	import type { TextSectionPayload } from "./types";

    const dispatch = createEventDispatcher();
    let timer: NodeJS.Timeout;

    function isStringEmpty(checkString: string): boolean {
        if (checkString == "") return true;
        
        return false;
    };

    function handleOnInput(updatedContent: string) {
        // Checking if our updatedContent is empty or no
        isEmpty = isStringEmpty(updatedContent) 
        
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            DocumentEditorContext.updateSection(id, {
                content: updatedContent,
            });
        }, 500);
    };

    $: isEditable = $DocumentEditorContext.isEditable;
    let isEmpty = false;

    onMount(() => {
        isEmpty = isStringEmpty(payload.content);
    });
    
    export let id: string;
    export let payload: TextSectionPayload;
</script>

<div class="w-full relative my-2">
    <div
        on:input={(event) => handleOnInput(event.target?.innerHTML ?? event.currentTarget.innerHTML)} 
        on:keydown={async (event) => {
            const key = event.key.toLowerCase();
            if (key == "enter" && !event.shiftKey) {
                event.preventDefault();
                event.stopPropagation();
                
                // Creating new section
                dispatch("addEmptySection");
            } else if (key == "backspace" && isEmpty) {
                // Deleting this section
                dispatch("selectSection", { id: await DocumentEditorContext.getPreviousSection(id) });
                
                DocumentEditorContext.deleteSection(id);
            };
        }}
        class="section-input z-10 text-gray-200 w-full outline-none" spellcheck="false" contenteditable={isEditable}>
        { @html payload.content }
    </div>

    { #if isEmpty }
        <span class="group-focus-within:opacity-100 opacity-0 transition z-[-1] absolute top-0 h-full text-gray-200 text-opacity-50">Type '/' for commands...</span>
    { /if }
</div>