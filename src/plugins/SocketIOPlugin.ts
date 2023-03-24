import type { Plugin } from 'vite';
import { SocketsEngine } from '../sockets';

export function SocketsPlugin() {
    return {
        name: "socket-io-plugin",
        configureServer(server) {
            SocketsEngine.inject(server.httpServer);
        },
    } as Plugin;
};