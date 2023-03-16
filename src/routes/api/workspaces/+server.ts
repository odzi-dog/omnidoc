import type { RequestHandler } from "./$types";
import { Workspace } from "$lib/database/entities";
import { getDatabase } from "$lib/database";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
    // Getting user account
    const session = await locals.validate();
    if (!session) throw error(401, "Unauthorized");

    // todo
    // fetch only user-related workspaces
    const workspaces = await getDatabase().find(Workspace, {});

    if (workspaces.length == 0) {
        // Creating default user workspace
        const workspace = new Workspace(`user's workspace`);

        await getDatabase().persistAndFlush(workspace);

        return new Response(JSON.stringify([workspace]));
    };

    return new Response(JSON.stringify(workspaces));
};