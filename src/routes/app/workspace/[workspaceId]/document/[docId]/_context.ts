import type { DocumentBody } from '$lib/editor';
import { getStore } from '$lib/helpers/getStore';
import { CurrentWorkspaceStore, type CurrentWorkspaceData, CurrentDocumentStore, type CurrentDocumentData } from '$lib/stores/Application';
import { writable } from 'svelte/store';

export interface DocumentEditorContextData {
    isEditable: boolean;

    content?: DocumentBody,
};

export const DocumentEditorContext = new (class StoreClass {
    public subscribe;
    private _update;
    
    constructor() {
        const { subscribe, update } = writable<DocumentEditorContextData>({ isEditable: false });

        this.subscribe = subscribe;
        this._update = update;
    };

    // todo
    // more typization
    public async updateSection(sectionId: string, payload: any) {
        this._update((object) => {
            if (!object.content) return object;

            const index = object.content.findIndex((x) => x.id == sectionId);
            if (index != -1) {
                object.content[index] = { ...object.content[index], payload };
            };

            console.log('updated object:', object);
            
            return object;
        });

        const workspaceStore = await getStore<CurrentWorkspaceData>(CurrentWorkspaceStore);
        const documentStore = await getStore<CurrentDocumentData>(CurrentDocumentStore);
        const editorStore = await getStore<DocumentEditorContextData>(DocumentEditorContext);

        console.log(documentStore);

        // todo
        // progressively send updates to database
        fetch(`/api/workspace/${ workspaceStore?.id }/document/${ documentStore?.document.id }`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(editorStore.content)
        })
        .then((response) => response.json())
        .then((response) => {
            console.log('got response:', response);
        })
    };

    public updateContext(data: Partial<DocumentEditorContextData>) {
        this._update((object) => {
            return {
                ...object,
                ...data,
            };
        });
    };
});