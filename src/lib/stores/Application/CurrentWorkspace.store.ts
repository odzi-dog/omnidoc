import { writable } from "svelte/store";
import type { Workspace } from "$lib/database/entities";

export type CurrentWorkspaceData = Workspace | null;

class StoreClass {
    public subscribe;
    private _update;

    constructor() {
        const { subscribe, update } = writable<CurrentWorkspaceData>(null);
        
        this.subscribe = subscribe;
        this._update = update;
    };

    // Fetch workspace by id
    public fetchById(workspaceId: string) {
        return new Promise((resolve, reject) => {
            fetch(`/api/workspace/${ workspaceId }`, { credentials: 'include' })
                .then((response) => {
                    if (response.status != 200) {
                        // todo
                        // better errors
                        throw new Error("Not found");
                    };
                    
                    return response;
                })
                .then((response) => response.json())
                .then((response: Workspace) => {
                    this._update(() => response);
                })
                .catch((error) => {
                    // todo
                    // better errors
                    reject(error);
                });
        });
    };

    public clear() {
        this._update(() => (null));
    };
};

export const CurrentWorkspaceStore = new StoreClass();