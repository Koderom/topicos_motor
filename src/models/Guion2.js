const {Conexion} = require('../database/conexion')
const {Escena} = require('./Escena2');
const Guion = {}

Guion.findGuionByID = async (id) => {
    try {
        let mGuion = {};
        const cliente = Conexion.newConexion();

        await cliente.connect();
        const query = 'SELECT * FROM guiones g WHERE g.id = $1';
        const params = [id];
        const response = await cliente.query(query, params);
        await cliente.end();

        if(response.rowCount == 0) throw new Error("guion no encontrado");
        mGuion = response.rows[0];
        mGuion.escenas = await Escena.findEscenasForGuionId(mGuion.id);

        return mGuion;
    } catch (error) {
        return error;
    }
}

Guion.findAll = () => {

}

Guion.saveGuion = async (guion) => {
    try {
        if(guion.id) await Guion.update(guion);
        else {
            const id = await Guion.saveNewGuion(guion);
            return id;
        } 
    } catch (error) {
        return error;
    }
}

Guion.saveNewGuion = async (guion) => {
    try {
        const cliente = Conexion.newConexion();

        await cliente.connect();
        const query = 'INSERT INTO guiones DEFAULT VALUES RETURNING id';
        const response = await cliente.query(query);
        await cliente.end();

        if(response.rowCount == 0) throw new Error("Error al insertar");
        if(guion.escenas) await Escena.saveListEscenas(guion.escenas, response.rows[0].id);
        return response.rows[0].id;
    } catch (error) {
        return error;
    }
}

Guion.update = async (guion) => {
    try {
        if(guion.escenas) await Escena.saveListEscenas(guion.escenas, guion.id);
    } catch (error) {
        return error;
    }
}

module.exports = {Guion}