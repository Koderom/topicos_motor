const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const server = require('http').createServer(app);
const WebSocket = require('ws');
const socketManager = require('./utils/SocketManager');

const SERVER_PORT = process.env.SERVER_PORT || 3035;
const wss = new WebSocket.Server({server: server});

app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

wss.on('connection', function connection(ws){
    console.log('nuevo cliente conectado');
    socketManager.updateSocket(wss);
});


const routes = require('./routes/routes');
app.use(routes);

server.listen(SERVER_PORT, () => {
    console.log(`servidor corriendo en el puerto ${SERVER_PORT}`);
});