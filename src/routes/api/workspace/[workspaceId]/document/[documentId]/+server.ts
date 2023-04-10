import { getDatabase } from "$lib/database";
import { Workspace, WorkspaceDocument } from "$lib/database/entities";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { pack } from "msgpackr";

async function fetchWorkspaceAndDocument(workspaceId: string, documentId: string): Promise<{ workspace: Workspace, document: WorkspaceDocument }> {
    const db = getDatabase();
    const workspace = await db.findOne(Workspace, {
        id: workspaceId,
    }, { populate: ["documents", "folders"] });

    const document = await db.findOne(WorkspaceDocument, { id: documentId });

    if (!workspace || !document) throw error(404, "Workspace or document not found");

    return { workspace, document };
};

export const DELETE: RequestHandler = async ({ params: { workspaceId, documentId } }) => {
    const db = getDatabase();
    const { workspace, document } = await fetchWorkspaceAndDocument(workspaceId, documentId);

    // Todo
    // add isAuthorized guard

    await db.removeAndFlush(document);

    return new Response(JSON.stringify(document.flatten()));
};

export const POST: RequestHandler = async ({ params: { workspaceId, documentId }, request }) => {
    const db = getDatabase();
    const { document } = await fetchWorkspaceAndDocument(workspaceId, documentId);

    // Todo
    // add isAuthorized guard
    const body = await request.json();

    // Todo
    // Checking if our body is of right json schema 

    document.body = pack(body);
    await db.persistAndFlush(document);

    return new Response(JSON.stringify(document.flatten()));
};