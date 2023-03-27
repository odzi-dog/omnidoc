<script lang="ts">
	import Sidebar from "./LoggedIn/Sidebar.svelte";
</script>

<div class="w-full flex h-screen bg-zinc-900 overflow-hidden">
    <!-- Sidebar -->

    <!-- do not do shit like this, kids -->
    <div class="p-2 w-1/6">
        <Sidebar class="w-full" />
    </div>

    <!-- Content -->
    <main class="h-full overflow-y-scroll ml-4 w-5/6 p-4">
        <slot />
    </main>
</div>