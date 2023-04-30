import { getDatabase } from "$lib/database";
import { Workspace, WorkspaceDocument } from "$lib/database/entities";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { pack, unpack } from "msgpackr";
import sanitizeHtml from "sanitize-html";
import type { DocumentBody } from "$lib/editor";
import type { AllSections } from "$lib/editor/types/AllSections.type";

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

export const POST: RequestHandler = async ({ params: { workspaceId, documentId }, request, url: { searchParams } }) => {
    const db = getDatabase();
    const { document } = await fetchWorkspaceAndDocument(workspaceId, documentId);

    // Todo
    // add isAuthorized guard
    const sectionId = searchParams.get("sectionId");
    const section: AllSections = await request.json();

    if (sectionId == null) throw error(400, "Invalid sectionId");

    if (section.type == "text") {
        // Sanitizing
        section.payload.content = sanitizeHtml(section.payload.content);
    };

    // Todo
    // Checking if our body is of right json schema 
    const unpackedBody: DocumentBody = document.body == undefined ? [] : unpack(document.body);
    const sectionsMap = new Map();

    unpackedBody.forEach((section) => sectionsMap.set(section.id, section));
    sectionsMap.set(section.id, section);

    document.body = pack([...sectionsMap.values()]);
    await db.persistAndFlush(document);

    return new Response(JSON.stringify(document.flatten()));
};