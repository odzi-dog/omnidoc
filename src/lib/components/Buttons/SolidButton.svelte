<script lang="ts">
    let additionalClassNames: String = "";

    export { additionalClassNames as class };
    export let attributes: any = null;
</script>

<button { ...attributes } class="
    flex items-center px-5 py-1.5 rounded-xl bg-blue-500 text-white transition
    hover:bg-blue-700 hover:text-gray-100
    { additionalClassNames }
">
    <slot />
</button>