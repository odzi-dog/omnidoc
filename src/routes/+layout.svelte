<script>
	import '../app.postcss';

	import { page } from "$app/stores";
	import { getUser, handleSession } from "@lucia-auth/sveltekit/client";
	import LoggedInLayout from '../components/Layout/LoggedInLayout.svelte';

	handleSession(page);

	const user = getUser();
</script>

{ #if $user == null }
	<LoggedInLayout>
		<slot />
	</LoggedInLayout>
{ :else }
	<slot />
{ /if }