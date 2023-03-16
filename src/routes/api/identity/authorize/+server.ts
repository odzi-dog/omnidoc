import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
    // Getting identityId from query parameter
    const identityId = url.searchParams.get("identityId");
    if (!identityId) throw redirect(307, "/login");

    // Using OryService to get information about this identity

    // Using lucia-auth to authorize this user

    return new Response("hello");
};