import { env } from "$env/dynamic/public";
import { Centrifuge } from "centrifuge";
import ServerWebSocket from "ws";

const ServerSynchronizationClient = new Centrifuge(`${ env.PUBLIC_CENTRIFUGO_URL }/connection/websocket`, {
    websocket: ServerWebSocket,
});
ServerSynchronizationClient.connect();

export { ServerSynchronizationClient };