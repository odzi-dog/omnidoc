<script lang="ts">
    import CarbonChevronSort from '~icons/carbon/chevron-sort';
    import CarbonBookmark from '~icons/carbon/bookmark';
    import CarbonGrid from '~icons/carbon/grid';
	import { RoundedIconButton } from '../../Buttons';
</script>

<sidebar class="h-full flex flex-col bg-zinc-800 w-1/6 rounded-2xl p-1 relative">
    <!-- Workspace -->
    <button class="flex items-center rounded-2xl hover:bg-zinc-700 transition p-3">
        <!-- Icon -->
        <div class="w-8 h-8 rounded-full bg-red-500 mr-3"></div>
 
        <!-- Texts -->
        <div class="mr-[auto] text-white">
            <h1 class="text-base font-medium">Playbox</h1>
            <p></p>
        </div>

        <!-- Choose other icon -->
        <CarbonChevronSort class="w-5 h-5 text-gray-300" />
    </button>

    <!-- Documents -->
    <div class="flex-grow p-3">

    </div>

    <!-- Account -->
    <div class="flex items-center gap-3 p-3">
        <!-- Profile icon -->
        <div class="rounded-full bg-red-500 w-9 h-9 mr-[auto]"></div>
    
        { #each [
            { icon: CarbonBookmark }, 
            { icon: CarbonGrid }
        ] as button }
            <RoundedIconButton icon={button.icon} />
        { /each }
    </div>    
</sidebar>