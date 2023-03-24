import type { AllSocketEvents } from "$lib/sockets";
import { writable } from "svelte/store";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export enum SocketsStoreState {
    NOT_CONNECTED = "NOT_CONNECTED",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED"
};

export interface SocketsStoreData {
    state: SocketsStoreState,
    listeningTo: Array<AllSocketEvents>,
};

class StoreClass {
    public subscribe;
    private _update;

    private client: Socket | undefined;

    constructor() {
        const { subscribe, update } = writable<SocketsStoreData>({
            state: SocketsStoreState.NOT_CONNECTED,
            listeningTo: [],
        });

        this.subscribe = subscribe;
        this._update = update;
    };

    public async setState(state: SocketsStoreState) {
        return new Promise((resolve) => {
            this._update((object) => {
                object.state = state;

                resolve(true);
                return object;
            });
        });
    };

    public async connect() {
        await this.setState(SocketsStoreState.CONNECTING);

        this.client = io({
            autoConnect: true,
            reconnection: true,
        });

        // Basic event listeners
        this.client.on("connect", () => {
            this.setState(SocketsStoreState.CONNECTED);
        });

        this.client.on("disconnect", () => {
            this.setState(SocketsStoreState.NOT_CONNECTED);
        });
    };
};

export const SocketsStore = new StoreClass();