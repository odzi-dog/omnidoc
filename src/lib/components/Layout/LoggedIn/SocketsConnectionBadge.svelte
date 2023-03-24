<script lang="ts">
	import { SocketsStore, SocketsStoreState } from "$lib/stores/Sockets.store";

    function getStateInformation(state: SocketsStoreState): { color: string, text: string } {
        switch (state) {
            case SocketsStoreState.CONNECTED:
                return {
                    color: "bg-green-500",
                    text: "Connected",
                };
        
            case SocketsStoreState.CONNECTING:
                return {
                    color: "bg-yellow-500",
                    text: "Connecting..."
                };
            
            case SocketsStoreState.NOT_CONNECTED:
                return {
                    color: "bg-red-500",
                    text: "Not connected"
                };
        };
    };
</script>

<div class="{ $SocketsStore.state == SocketsStoreState.CONNECTED ? "opacity-30 hover:opacity-100" : "" } px-3 py-1.5 rounded-2xl flex items-center bg-zinc-700 transition">
    <div class="w-4 h-4 rounded-full { getStateInformation($SocketsStore.state).color }"></div>

    <p class="text-sm ml-1.5 text-gray-300">{ getStateInformation($SocketsStore.state).text }</p>
</div>