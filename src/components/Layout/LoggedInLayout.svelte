<script lang="ts">
	import Sidebar from "./LoggedIn/Sidebar.svelte";
</script>

<div class="w-full flex h-screen bg-zinc-900 p-2">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <main class="ml-4 w-full">
        <slot />
    </main>
</div>