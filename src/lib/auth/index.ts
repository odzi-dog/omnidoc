import { default as lucia } from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import { dev } from "$app/environment";
import { Adapter } from "./adapter";

export interface User {
    userId: string,
    username: string,
};

export const auth = lucia({
    adapter: Adapter,
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),

    transformUserData: (userData) => {
        return {
            userId: userData.id,
            username: userData.username,
        } as User;
    },
});

export type Auth = typeof auth;