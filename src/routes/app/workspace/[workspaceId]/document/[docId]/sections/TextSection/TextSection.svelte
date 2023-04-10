<script lang="ts">
	import { DocumentEditorContext } from "../../_context";
	import type { TextSectionPayload } from "./types";

    function handleOnInput(event: InputEvent & { currentTarget: EventTarget & HTMLDivElement }) {
        DocumentEditorContext.updateSection(id, {
            content: event.currentTarget.innerHTML,
        });
    };

    $: isEditable = $DocumentEditorContext.isEditable;
    
    export let id: string;
    export let payload: TextSectionPayload;
</script>

<div on:input={handleOnInput} class="text-gray-200 my-2" spellcheck="false" contenteditable={isEditable}>{ payload.content }</div>