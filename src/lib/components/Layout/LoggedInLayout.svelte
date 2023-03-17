<script lang="ts">
	import Sidebar from "./LoggedIn/Sidebar.svelte";
</script>

<div class="w-full flex h-screen bg-zinc-900 p-2">
    <!-- Sidebar -->
    <Sidebar class="w-1/6" />

    <!-- Content -->
    <main class="ml-4 w-5/6 p-4">
        <slot />
    </main>
</div>