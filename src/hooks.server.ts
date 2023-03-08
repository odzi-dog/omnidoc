import { auth } from "$lib/auth";
import { handleHooks } from "@lucia-auth/sveltekit";

export const handle = handleHooks(auth);