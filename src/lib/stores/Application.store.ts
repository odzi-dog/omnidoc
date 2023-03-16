import type { Workspace } from "$lib/database/entities";
import { writable } from "svelte/store";

export interface ApplicationStoreData {
    workspaces: Workspace[] | null,
};

class StoreClass {
    public subscribe;
    private _update;

    constructor() {
        const { subscribe, update } = writable<ApplicationStoreData>({
            workspaces: null
        });

        this.subscribe = subscribe;
        this._update = update;
    };

    // Initialize our application
    // - fetch all available workspaces
    // - fetch current workspace's information
    public async initialize() {
        this.fetchWorkspaces();
    };

    private fetchWorkspaces() {
        fetch(`/api/workspaces`, { credentials: 'include' })
            .then((response) => response.json())
            .then((response) => {
                this._update((object) => {
                    object.workspaces = response;
                    return object;
                });
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };
};

export const ApplicationStore = new StoreClass();