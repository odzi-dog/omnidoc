import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    createDocument: async ({ params, request, fetch }) => {
        const formData = await request.formData();
        if (!formData.has("title") || formData.get("title") == "") throw error(400, "Document name must be set");
        
        const payload = {
            title: formData.get("title")!,
            location: formData.get("location"),
        };

        // Using API route to create our document
        return await fetch(`/api/workspace/${ params.workspaceId }/document`, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then((response) => response.json())
    },
};