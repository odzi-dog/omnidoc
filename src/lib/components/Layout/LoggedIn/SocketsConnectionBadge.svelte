<script lang="ts">
	import { SynchronizationStore, SynchronizationStoreState } from "$lib/stores/Synchronization.store";

    function getStateInformation(state: SynchronizationStoreState): { color: string, text: string } {
        switch (state) {
            case SynchronizationStoreState.CONNECTED:
                return {
                    color: "bg-green-500",
                    text: "Connected",
                };
        
            case SynchronizationStoreState.CONNECTING:
                return {
                    color: "bg-yellow-500",
                    text: "Connecting..."
                };
            
            default:
                return {
                    color: "bg-red-500",
                    text: "Not connected"
                };
        };
    };
</script>

<div class="{ false ? "opacity-30 hover:opacity-100" : "" } px-3 py-1.5 rounded-2xl flex items-center bg-zinc-700 transition">
    <div class="w-4 h-4 rounded-full { getStateInformation($SynchronizationStore.state).color }"></div>

    <p class="text-sm ml-1.5 text-gray-300">{ getStateInformation($SynchronizationStore.state).text }</p>
</div>