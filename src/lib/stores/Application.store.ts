import type { Workspace } from "lib/database/entities";
import { writable } from "svelte/store";

export type ApplicationStoreData = LoadedApplicationStore | UnloadedApplicationStore;

interface LoadedApplicationStore {
    isLoaded: true,

    workspaces: Workspace[],
};

interface UnloadedApplicationStore {
    isLoaded: false,
};

class StoreClass {
    public subscribe;
    private _update;

    constructor() {
        const { subscribe, update } = writable<ApplicationStoreData>({
            isLoaded: false,
        });

        this.subscribe = subscribe;
        this._update = update;
    };

    // Initialize our application
    // - fetch all available workspaces
    // - fetch current workspace's information
    public async initialize() {
        return;
    };
};

export const ApplicationStore = new StoreClass();