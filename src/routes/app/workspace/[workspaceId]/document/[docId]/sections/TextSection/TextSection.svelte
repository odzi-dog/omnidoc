<script lang="ts">
	import type { TextSectionPayload } from "./types";

    export let payload: TextSectionPayload;
</script>

<p class="text-gray-200 my-2">{ payload.content }</p>