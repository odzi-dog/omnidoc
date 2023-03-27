import type { Centrifuge, Subscription } from "centrifuge";
import { writable } from "svelte/store";

import * as Events from './SynchronizationStore/events';
import { getStore } from "$lib/helpers/getStore";
import { getClient } from "$lib/synchronization/client";

export enum SynchronizationStoreState {
    CONNECTED = "connected",
    CONNECTING = "connecting",
    DISCONNECTED = "disconnected",
    CLOSED = "closed",
};

export interface SynchronizationStoreData {
    state: SynchronizationStoreState,
    disconnectedTimer?: number,
};

class StoreClass {
    public subscribe;
    private _update;

    public client: Centrifuge;
    private subscriptions: Map<string, Subscription> = new Map();

    constructor() {
        const { subscribe, update } = writable<SynchronizationStoreData>({
            state: SynchronizationStoreState.DISCONNECTED,
        });

        this.subscribe = subscribe;
        this._update = update;

        this.client = getClient();
        this.addListeners();
    };

    public initialize() {
        // Connecting
        this.client.connect();
    };

    public setState(state: SynchronizationStoreState) {
        this._update((object) => {
            object.state = state;
            return object;
        });
    };

    public addListeners() {
        // Adding event handlers
        Object.values(Events).forEach((EventClass) => {
            const eventInstance = new EventClass();
            this.client.on(eventInstance.key, (ctx: unknown) => {
                eventInstance.handle(this.client, ctx as any);
            });
        });
    };

    public async addSubscription(subscriptionName: string, handler: CallableFunction) {
        if (!this.subscriptions.has(subscriptionName)) {
            const subscription = this.client.newSubscription(subscriptionName);
            subscription.on("publication", (ctx) => {
                handler(ctx.data);
            }).subscribe();

            this.subscriptions.set(subscriptionName, subscription);
        };
    };

    public async unsubscribe(subscriptionName: string) {
        if (this.subscriptions.has(subscriptionName)) {
            const subscription = this.subscriptions.get(subscriptionName) as Subscription;

            subscription.unsubscribe();
            this.client.removeSubscription(subscription);

            this.subscriptions.delete(subscriptionName);
        };
    };
};

export const SynchronizationStore = new StoreClass();