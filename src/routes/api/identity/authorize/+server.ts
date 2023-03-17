import { auth } from "$lib/auth";
import { OryService } from "$lib/ory";
import { redirect, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

function serializeAllCookies(cookies: Array<{ name: string, value: string }>): string {
    let serialized = "";

    cookies.forEach((cookie) => {
        serialized = `${serialized}; ${cookie.name}=${cookie.value}`
    });

    return serialized;
};

export const GET: RequestHandler = async ({ url, cookies }) => {
    // Getting identityId from query parameter
    const identityId = url.searchParams.get("identityId");
    if (!identityId) throw redirect(307, "/login");

    // Using OryService to get information about this identity
    try {
        const { data: { identity } } = await OryService.toSession(undefined, {
            headers: {
                cookie: serializeAllCookies(cookies.getAll()),
            }
        });

        // Checking if we have this user or no
        if (await auth.getKey("odzi.dog", identity.id).catch(() => (null)) == null) {
            await auth.createUser({
                key: {
                    providerId: "odzi.dog",
                    providerUserId: identity.id,
                    password: null
                },
                attributes: {}
            });    
        };

        const key = await auth.getKey("odzi.dog", identity.id);

        // Creating our session
        const session = await auth.createSession(key.userId);
        const sessionCookies = auth.createSessionCookies(session);

        // idk what to do with this.
        if (sessionCookies.length > 1) throw error(500, { message: "Server error" });

        // Sending session cookies back to user
        return new Response(null, {
            status: 307,
            headers: {
                "set-cookie": sessionCookies[0].serialize(),
                location: "/app"
            }
        });
    } catch(e) {
        throw error(500, {
            message: "Unknown session provided"
        });
    };
};