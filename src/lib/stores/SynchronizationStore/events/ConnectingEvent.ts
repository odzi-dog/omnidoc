import { SynchronizationStore, SynchronizationStoreState } from "$lib/stores/Synchronization.store";
import type { Centrifuge, ConnectingContext } from "centrifuge";
import type { AbstractEvent } from "../AbstractEvent.class";

export class ConnectingEvent implements AbstractEvent {
    public readonly key = "connecting";

    public handle(client: Centrifuge, ctx: ConnectingContext) {
        SynchronizationStore.setState(SynchronizationStoreState.CONNECTING);
    };
};