<script lang="ts">
	import '../app.postcss';

	import { page } from "$app/stores";
	import type { LayoutData } from './$types';
	import LoggedInLayout from '$lib/components/Layout/LoggedInLayout.svelte';
	import { UserStore } from '$lib/stores/User.store';
	import GuestLayout from '$lib/components/Layout/GuestLayout.svelte';
	
	export let data: LayoutData;

	UserStore.loadFromFlatObject(data);
</script>

{ #if $UserStore != null }
	<LoggedInLayout>
		<slot />
	</LoggedInLayout>
{ :else }
	<GuestLayout>
		<slot />
	</GuestLayout>
{ /if }