/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("lib/auth").Auth;
	type UserAttributes = unknown;
}

declare global {
	namespace App {
		interface Locals {
			validate: import("@lucia-auth/sveltekit").Validate;
			validateUser: import("@lucia-auth/sveltekit").ValidateUser;
			setSession: import("@lucia-auth/sveltekit").SetSession;
		}
	}
}

export {};