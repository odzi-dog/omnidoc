import { getDatabase } from "$lib/database";
import { Workspace, WorkspaceDocument } from "$lib/database/entities";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { workspaceId } }) => {
    const em = getDatabase();
    const workspace = await getDatabase().findOne(Workspace, {
        id: workspaceId,
    }, { populate: ["documents", "folders"] });

    if (!workspace) throw error(404, "Workspace not found");

    // Creating new document (just for test!!)
    const document = new WorkspaceDocument(`Test ${Math.random()}`, workspace);
    await em.persistAndFlush(document);

    return new Response(JSON.stringify(workspace));
};