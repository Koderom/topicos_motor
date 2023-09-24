const {Pool, Client} = require('pg');
const dotenv = require('dotenv').config();

const conexion = {};

conexion.newConexion = () => {
    const pool = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
    return pool;
}



module.exports = {conexion};