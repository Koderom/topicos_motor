const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3035;

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

const routes = require('./routes/routes');
app.use(routes);

app.listen(SERVER_PORT, () => {
    console.log(`servidor corriendo en el puerto ${SERVER_PORT}`);
});