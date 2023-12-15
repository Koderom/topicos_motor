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
const middleware = require('./middlewares/middleware');

app.use((req, res, next) => {
    if (req.path === '/api/login') next();
    else if(req.path === '/wh/d-id') next();
    else if(req.path === '/wh/d-id/generar-saludo') next();
    else if(req.path === '/wh/d-id/generar-peticion') next();
    else if(req.path === '/wh/twilio') next();
    else if(req.path === '/api/test') next();
    else middleware.auth(req, res, next);
});

app.use(routes);

server.listen(SERVER_PORT, () => {
    console.log(`servidor corriendo en el puerto ${SERVER_PORT}`);
});