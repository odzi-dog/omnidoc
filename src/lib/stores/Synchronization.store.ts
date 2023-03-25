import { Centrifuge } from "centrifuge";
import { writable } from "svelte/store";
import { env } from "$env/dynamic/public";

import * as Events from './SynchronizationStore/events';

export enum SynchronizationStoreState {
    CONNECTED = "connected",
    CONNECTING = "connecting",
    DISCONNECTED = "disconnected",
    CLOSED = "closed",
};

export interface SynchronizationStoreData {
    state: SynchronizationStoreState
};

class StoreClass {
    public subscribe;
    private _update;

    public client: Centrifuge;

    constructor() {
        const { subscribe, update } = writable<SynchronizationStoreData>({
            state: SynchronizationStoreState.DISCONNECTED,
        });

        this.subscribe = subscribe;
        this._update = update;

        this.client = new Centrifuge(`ws://${ env.PUBLIC_CENTRIFUGO_URL }/connection/websocket`, {});
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
};

export const SynchronizationStore = new StoreClass();