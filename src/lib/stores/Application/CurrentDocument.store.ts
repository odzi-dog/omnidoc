import type { FlatWorkspaceDocument } from "$lib/database/entities";
import { writable } from "svelte/store";

interface Collaborator {
    id: string,
    color: string,

    // Mouse information
    mouse: {
        x: number,
        y: number,
    }
};

interface LoadedDocumentStore {
    document: FlatWorkspaceDocument,

    // Collaboration information
    collaborators: Array<Collaborator>
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
                collaborators: [],
            };
        });
    };

    public addCollaborator(collaboratorId: string) {
        this._update((object) => {
            if (!object?.collaborators.find((x) => x.id == collaboratorId)) {
                object?.collaborators.push({
                    id: collaboratorId,
                    color: "#000",

                    mouse: {
                        x: 0,
                        y: 0,
                    }
                });
            };
            
            return object;
        });
    };

    public updateCollaborator(collaboratorId: string, data: Partial<Omit<Collaborator, 'id'>>) {
        this._update((object) => {
            if (!object) return null;

            // Checking if we have this collaborator's information
            const index = object.collaborators.findIndex(x => x.id == collaboratorId); 
            if (index != -1) {
                // Updating this collaborator's data
                object.collaborators[index] = {
                    ...object.collaborators[index],
                    ...data,
                };
            };

            return object;
        });
    };

    public clear() {
        this._update(() => (null));
    };
};

export const CurrentDocumentStore = new StoreClass();