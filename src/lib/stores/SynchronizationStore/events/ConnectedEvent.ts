import { SynchronizationStore, SynchronizationStoreState } from "$lib/stores/Synchronization.store";
import type { Centrifuge, ConnectedContext } from "centrifuge";
import type { AbstractEvent } from "../AbstractEvent.class";

export class ConnectedEvent implements AbstractEvent {
    public readonly key = "connected";

    public handle(client: Centrifuge, ctx: ConnectedContext) {
        SynchronizationStore.setState(SynchronizationStoreState.CONNECTED);
    };
};