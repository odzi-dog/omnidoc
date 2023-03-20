<script lang="ts">
    let additionalClasses: String = "";
    
    export let icon: any;
    export let style: "normal" | "dark" = "normal";
    export { additionalClasses as class };
</script>

<button on:click class="
    rounded-full border-2 { style == "normal" ? "bg-zinc-700 border-zinc-600" : "bg-zinc-900 border-zinc-900" } p-2 text-gray-300 transition 
    { style == "normal" ? "hover:bg-zinc-600" : "hover:bg-zinc-800" } hover:text-white
    { additionalClasses }
">
    <svelte:component this={icon} class="w-5 h-5" />
</button>