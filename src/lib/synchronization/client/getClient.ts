import { env } from "$env/dynamic/public";
import { Centrifuge } from "centrifuge";

export function getClient(autoConnect = false) {
    const client = new Centrifuge(`${ env.PUBLIC_CENTRIFUGO_URL ?? "ws://localhost:8001" }/connection/websocket`, {});

    if (autoConnect) client.connect();

    return client;
};