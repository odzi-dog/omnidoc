import type { RequestHandler } from "./$types";
import { Workspace } from "$lib/database/entities";
import { getDatabase } from "$lib/database";
import { error } from "@sveltejs/kit";
import { auth } from "$lib/auth";

export const GET: RequestHandler = async ({ locals }) => {
    // Getting user account
    const session = await locals.validate();
    if (!session) throw error(401, "Unauthorized");

    const user = await auth.getUser(session.userId);
    if (!user) throw error(500, "User not found");

    // todo
    // fetch only user-related workspaces
    const workspaces = await getDatabase().find(Workspace, {});

    if (workspaces.length == 0) {
        // Creating default user workspace
        const workspace = new Workspace(`${ user.username } workspace`);

        await getDatabase().persistAndFlush(workspace);

        return new Response(JSON.stringify([workspace]));
    };

    return new Response(JSON.stringify(workspaces));
};