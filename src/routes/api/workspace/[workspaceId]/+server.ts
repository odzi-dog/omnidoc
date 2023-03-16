import { getDatabase } from "$lib/database";
import { Workspace } from "$lib/database/entities";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { workspaceId } }) => {
    const workspace = await getDatabase().findOne(Workspace, {
        id: workspaceId
    });

    if (!workspace) throw error(404, "Workspace not found");

    return new Response(JSON.stringify(workspace));
};