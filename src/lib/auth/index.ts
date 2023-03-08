import { default as lucia } from "lucia-auth";
import { dev } from "$app/environment";
import { Adapter } from "./adapter";

export const auth = lucia({
    adapter: Adapter,
    env: dev ? "DEV" : "PROD",
});

export type Auth = typeof auth;