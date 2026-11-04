const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static(path.join(__dirname, 'public')));

const registerSocketHandlers = require('./src/socketHandlers');
registerSocketHandlers(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server online: http://localhost:${PORT}`);
  console.log(`- Nguoi choi: http://localhost:${PORT}/index.html`);
  console.log(`- Admin: http://localhost:${PORT}/admin.html`);
});
