import type { Readable, Unsubscriber } from "svelte/store";

export function getStore<T>(store: Readable<T>): Promise<T> {
    return new Promise((resolve) => {
        let unsubscribe: Unsubscriber | null = null;
        unsubscribe = store.subscribe((object) => {
            resolve(object);
            if (unsubscribe) unsubscribe();
        });
    });
};