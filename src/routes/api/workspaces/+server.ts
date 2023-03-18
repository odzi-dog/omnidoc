import type { RequestHandler } from "./$types";
import { Workspace } from "$lib/database/entities";
import { getDatabase } from "$lib/database";
import { error } from "@sveltejs/kit";
import { auth, type User } from "$lib/auth";
import { createDefaultWorkspace } from "./_helpers/createDefaultWorkspace";

export const GET: RequestHandler = async ({ locals }) => {
    // Getting user account
    const session = await locals.validate();
    if (!session) throw error(401, "Unauthorized");

    const user = await auth.getUser(session.userId) as User;
    if (!user) throw error(500, "User not found");

    // todo
    // fetch only user-related workspaces
    const workspaces = await getDatabase().find(Workspace, {});

    if (workspaces.length == 0) {
        // Creating default user workspace
        const workspace = await createDefaultWorkspace(user);
        return new Response(JSON.stringify([workspace]));
    };

    return new Response(JSON.stringify(workspaces));
};