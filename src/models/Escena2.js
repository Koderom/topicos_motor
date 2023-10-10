const {Conexion} = require('../database/conexion');
const {Archivo} = require('./Archivo2');
const Escena = {}

Escena.findEscenaByID = (id) => {

}

Escena.findAll = () => {

}

Escena.findEscenasForGuionId = async (guionId) => {
    try {
        let mEscenas = [];
        const cliente = Conexion.newConexion();

        await cliente.connect();
        const query = 'SELECT * FROM guiones g, escenas es WHERE g.id = es.guion_id and g.id = $1';
        const params = [guionId];
        const response = await cliente.query(query, params);
        await cliente.end();
        
        if(response.rowCount == 0) throw new Error("consulta no ha generado resultados");
        mEscenas = await Archivo.findArchivosForEscenas(response.rows);
        
        return mEscenas;
    } catch (error) {
        return error;
    }
}

Escena.saveArchivo = async (escena) => {
    try {
        
    } catch (error) {
        
    }
}
Escena.saveNewEscena = async(escena, guionId) => {
    try {
        const cliente = Conexion.newConexion();

        await cliente.connect();
        const query = 'INSERT INTO escenas(descripcion, tipo, guion_id) VALUES($1, $2, $3) RETURNING id';
        const params = [escena.descripcion, escena.tipo, guionId];
        const response = await cliente.query(query, params);
        await cliente.end();
        if(response.rowCount > 0) await Archivo.save(escena.archivo, response.rows[0].id);
    } catch (error) {
        return error;   
    }
}

Escena.update = async (escena) => {
    try {
        const cliente = Conexion.newConexion();

        await cliente.connect();
        const query = `
            UPDATE escenas
            SET descripcion = $1, tipo = $2
            WHERE id = $3
        `;
        const params = [escena.descripcion, escena.tipo, escena.id];
        await cliente.query(query, params);
        await cliente.end();

        if(escena.archivo) await Archivo.save(escena.archivo, escena.id);
    } catch (error) {
        return error;
    }
}

Escena.saveListEscenas = async (escenas, guionId) => {
    try {
        await Promise.all(await escenas.forEach( async (escena) => {
            if(escena.id) await Escena.update(escena);
            else await Escena.saveNewEscena(escena, guionId);
        }));
    } catch (error) {
        return error;
    }
}

module.exports = {Escena};