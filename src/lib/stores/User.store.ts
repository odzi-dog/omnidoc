import type { User } from "$lib/auth";
import { writable } from "svelte/store";

export type UserData = User | null;

class StoreClass {
    public subscribe;
    private _update;

    constructor() {
        const { subscribe, update } = writable<UserData>(null);

        this.subscribe = subscribe;
        this._update = update;
    };

    async loadFromFlatObject(user: User) {
        console.log("user store:", user);
        if (Object.keys(user).length == 0) return;
        
        this._update(() => {
            return user;
        });
    };
};

export const UserStore = new StoreClass();