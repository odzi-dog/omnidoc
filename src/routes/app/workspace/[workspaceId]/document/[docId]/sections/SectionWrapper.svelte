<script lang="ts">
    import CarbonAdd from '~icons/carbon/add';
    import CarbonChevronSort from '~icons/carbon/chevron-sort';

    export let id: string;
</script>

<section {id} class="z-10 group relative group flex items-start">
    <!-- Section controls -->
    <div class="group-focus-within:opacity-60 opacity-0 group-hover:opacity-60 transition flex mt-1 mr-2">
        <button class="rounded-xl hover:bg-zinc-800 transition p-1">
            <CarbonAdd class="w-5 h-5 text-white" />
        </button>

        <button class="rounded-xl hover:bg-zinc-800 transition p-1">
            <CarbonChevronSort class="w-5 h-5 text-white" />
        </button>
    </div>

    <slot />
</section>