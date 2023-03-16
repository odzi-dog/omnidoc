<script>
	import '../app.postcss';

	import { page } from "$app/stores";
	import { getUser, handleSession } from "@lucia-auth/sveltekit/client";
	import LoggedInLayout from '$lib/components/Layout/LoggedInLayout.svelte';
	import { onMount } from 'svelte';

	handleSession(page);
	const user = getUser();
</script>

{ #if $user != null }
	<LoggedInLayout>
		<slot />
	</LoggedInLayout>
{ :else }
	<slot />
{ /if }