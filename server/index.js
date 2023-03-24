import { handler } from './handler.js';
import { SocketsEngine } from './socketsEngine.js';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
SocketsEngine.inject(server);

server.listen(3000, () => {
  console.log('listening on port 3000');
});