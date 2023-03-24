import { Server } from "socket.io";
import type { ViteDevServer } from "vite";

class SocketsClass {
    private server;
    
    constructor() {
        this.server = new Server();
    };

    public inject(server: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.server = new Server(server);
        this.initialize();
    };

    public initialize() {
        this.server.on("connection", (socket) => {
            console.log("new socket connected!");
        });
    };
};

export const SocketsEngine = new SocketsClass();