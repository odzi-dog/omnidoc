<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="w-full h-full flex items-center justify-center">
    <div class="w-1/3 rounded-2xl bg-zinc-800 p-6 text-center">
        <!-- Title -->
        <h1 class="text-2xl text-white">{ $page.status }</h1>

        <!-- Error information -->
        <p class="text-sm text-gray-300">{ $page.error?.message }</p>
    </div>
</div>