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
                .then((response) => response.json())
                .then((response: Workspace) => {
                    console.log("fetchWorkspaceById response:", response);
                    this._update(() => response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};

export const CurrentWorksaceStore = new StoreClass();