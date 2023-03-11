<script lang="ts">
    let additionalClasses: String = "";
    
    export let icon: any;
    export { additionalClasses as class };
</script>

<button class="
    rounded-full bg-zinc-700 border-2 border-zinc-600 p-2 text-gray-300 transition 
    hover:bg-zinc-600 hover:text-white
    { additionalClasses }
">
    <svelte:component this={icon} class="w-5 h-5" />
</button>