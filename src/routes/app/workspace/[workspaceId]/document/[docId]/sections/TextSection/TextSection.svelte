<script lang="ts">
	import { DocumentEditorContext } from "../../_context";
	import type { TextSectionPayload } from "./types";

    $: isEditable = DocumentEditorContext.getContext().isEditable;
    export let payload: TextSectionPayload;
</script>

{ #if isEditable }
    <!-- todo -->
{ :else }
    <p class="text-gray-200 my-2">{ payload.content }</p>
{ /if }