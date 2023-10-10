const {Conexion} = require('../database/conexion');
const fs = require('fs');
const path = require('path');
const socketManager = require('../utils/SocketManager');

const controller = {};
controller.index = (req, res) => {
    socketManager.sendObjectAll({mensaje: 'hola mundo'});
    res.json({
        "mensaje" : "hola mundo"
    });
};

controller.start = async (req, res) => {    
    try {
        const client = Conexion.newConexion();
        await client.connect();

        const tablaspath = path.join(__dirname,'../database/tablas2.sql' );
        const sqlScriptTablas = fs.readFileSync(tablaspath, 'utf-8');
        await client.query(sqlScriptTablas);
        await client.end();

        res.status(200).send("ok");
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    }
}

module.exports = controller;