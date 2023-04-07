import { getDatabase } from '$lib/database';
import { Workspace, WorkspaceDocument, WorkspaceFolder } from '$lib/database/entities';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params: { workspaceId }, request }) => {
    const db = getDatabase();

    // Getting workspace with this id
    const workspace = await db.findOne(Workspace, {
        id: workspaceId,
    }, { populate: ["documents", "folders"] });

    if (!workspace) throw error(404, "Workspace not found");

    // Creating new document
    const payload = await request.json() as { title: string, location?: string };
    
    // Putting this document in folder (if exists)
    let folder: WorkspaceFolder | null = null;
    if (payload.location) {
        folder = await db.findOne(WorkspaceFolder, {
            id: payload.location,
        });
    };

    const document = new WorkspaceDocument(payload.title, workspace, folder ?? undefined);
    await db.persistAndFlush(document);

    return new Response(JSON.stringify(document.flatten()));
};