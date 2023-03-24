import { copyFileSync } from "fs";
import * as esbuild from 'esbuild';

(() => {
    console.log("Running build task...");

    // Copying server file from ./server/index.js to ./build directory
    copyFileSync("server/index.js", "build/index.js");

    // Using esbuild to bundle src/sockets/index.js' SocketsEngine
    esbuild.buildSync({
        entryPoints: ["src/sockets/index.ts"],
        outfile: "build/socketsEngine.js"
    });
})();