import { getStore } from "$lib/helpers/getStore";
import { writable } from "svelte/store";

interface PageEntry {
    id?: string,
    title: string,
};

export interface SettingsPageMetaData {
    pages: Array<PageEntry>,
    currentPage: PageEntry | null
};

class StoreClass {
    public subscribe;
    private _update;

    constructor() {
        const { subscribe, update } = writable<SettingsPageMetaData>({
            pages: [{ title: "General" }, { title: "Account" }, { title: "Members" }],
            currentPage: null
        });

        this.subscribe = subscribe;
        this._update = update;
    };

    public async setCurrentPage(id: string) {
        const store = await getStore<SettingsPageMetaData>(this);
        
        // Trying to find page with this id
        const page = store.pages.find((x) => x.id == id || x.title.toLowerCase() == id);
        
        // todo
        // throw error
        if (!page) return;

        this._update((object) => {
            object.currentPage = page;
            return object;
        });
    };
}

export const SettingsPageMetaStore = new StoreClass();