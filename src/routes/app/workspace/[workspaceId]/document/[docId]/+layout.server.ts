import type { LayoutServerLoad } from "./$types";
import { getDatabase } from "$lib/database";
import { TextDocument } from "$lib/database/entities";
import { error } from "@sveltejs/kit";

const load: LayoutServerLoad = async function({ params }) {
    const Database = getDatabase();
    const documentId = params.docId;

    // Trying to get this document from database
    const document = await Database.findOne(TextDocument, documentId);
    
    if (!document) throw error(404, "Document not found");
    return document;
};

export { load };