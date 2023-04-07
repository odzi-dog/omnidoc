import type { FlatWorkspaceDocument } from "$lib/database/entities";
import { writable } from "svelte/store";

interface LoadedDocumentStore {
    document: FlatWorkspaceDocument,

    // Collaboration information
};

export type CurrentDocumentData = LoadedDocumentStore | null;

class StoreClass {
    public subscribe;
    private _update;

    constructor() {
        const { subscribe, update } = writable<CurrentDocumentData>(null);

        this.subscribe = subscribe;
        this._update = update;
    };

    // Load functions
    public async loadFromFlatObject(document: FlatWorkspaceDocument) {
        this._update(() => {
            return {
                document,
            };
        });
    };

    public clear() {
        this._update(() => (null));
    };
};

export const CurrentDocumentStore = new StoreClass();