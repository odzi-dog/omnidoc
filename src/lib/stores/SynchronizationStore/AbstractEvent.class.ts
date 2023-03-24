import type { Centrifuge, ClientEvents } from "centrifuge";

export interface AbstractEvent {
    key: keyof ClientEvents;
    handle(client: Centrifuge, context: Record<string, any>): void;
};