/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("lib/auth").Auth;
	type UserAttributes = {
		username: string;
	};
}

declare global {
	namespace App {
		type Locals = import("lucia-auth").AuthRequest;
	};
}

export {};