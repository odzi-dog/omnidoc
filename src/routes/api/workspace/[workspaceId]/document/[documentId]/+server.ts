import { getDatabase } from "$lib/database";
import { Workspace, WorkspaceDocument } from "$lib/database/entities";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ params: { workspaceId, documentId } }) => {
    const db = getDatabase();
    const workspace = await db.findOne(Workspace, {
        id: workspaceId,
    }, { populate: ["documents", "folders"] });

    const document = await db.findOne(WorkspaceDocument, { id: documentId });

    if (!workspace || !document) throw error(404, "Workspace or document not found");

    await db.removeAndFlush(document);

    return new Response(JSON.stringify(document));
};