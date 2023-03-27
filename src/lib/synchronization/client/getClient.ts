import { env } from "$env/dynamic/public";
import { Centrifuge } from "centrifuge";

export function getClient(autoConnect = false) {
    const client = new Centrifuge(`ws://${ env.PUBLIC_CENTRIFUGO_URL }/connection/websocket`, {});

    if (autoConnect) client.connect();

    return client;
};