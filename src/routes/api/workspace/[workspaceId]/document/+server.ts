import { getDatabase } from '$lib/database';
import { Workspace, WorkspaceDocument, WorkspaceFolder } from '$lib/database/entities';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params: { workspaceId }, request }) => {
    const db = getDatabase();

    console.log("create document request");

    // Getting workspace with this id
    const workspace = await db.findOne(Workspace, {
        id: workspaceId,
    }, { populate: ["documents", "folders"] });

    console.log("workspace:", workspace);

    if (!workspace) throw error(404, "Workspace not found");

    // Creating new document
    const payload = await request.json() as { title: string, location?: string };
    
    console.log("payload:", payload);

    // Putting this document in folder (if exists)
    let folder: WorkspaceFolder | null = null;
    if (payload.location) {
        folder = await db.findOne(WorkspaceFolder, {
            id: payload.location,
        });
    };

    console.log("folder:", folder);
    
    const document = new WorkspaceDocument("test document", workspace);

    await db.persistAndFlush(document).catch((error) => {
        console.log("error:", error);
    });

    console.log('document:', document);

    return new Response(JSON.stringify(document.flatten()));
};