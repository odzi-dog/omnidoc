import type { DocumentBody } from '$lib/editor';
import type { AllSections } from '$lib/editor/types/AllSections.type';
import { getStore } from '$lib/helpers/getStore';
import { CurrentWorkspaceStore, type CurrentWorkspaceData, CurrentDocumentStore, type CurrentDocumentData } from '$lib/stores/Application';
import { nanoid } from 'nanoid';
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

    public async addEmptySection() {
        await this.updateSection(nanoid(), { content: "Empty text section" }, "text");
    };
    
    public async updateSection(sectionId: string, payload: AllSections["payload"], type?: AllSections["type"]) {
        this._update((object) => {
            if (!object.content) return object;

            const index = object.content.findIndex((x) => x.id == sectionId);
            if (index != -1) {
                object.content[index] = { ...object.content[index], payload };
            } else {
                if (type == undefined) throw new Error("Ooops. Error 92jdka");
                object.content.push({ id: sectionId, type, payload });
            };

            return object;
        });

        const workspaceStore = await getStore<CurrentWorkspaceData>(CurrentWorkspaceStore);
        const documentStore = await getStore<CurrentDocumentData>(CurrentDocumentStore);
        const editorStore = await getStore<DocumentEditorContextData>(DocumentEditorContext);

        console.log(documentStore);

        // todo
        // progressively send updates to database
        fetch(`/api/workspace/${ workspaceStore?.id }/document/${ documentStore?.document.id }?sectionId=${ sectionId }`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(editorStore.content?.find((x) => x.id == sectionId)),
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