const {Conexion} = require('../database/conexion');
const Archivo = {};

Archivo.findArchivoByID = (id) => {

}

Archivo.findAll = () => {

}
Archivo.findArchivosForEscenas = async (escenas) => {
    try {
        const cliente = Conexion.newConexion();
        await cliente.connect();

        escenas = await Promise.all(escenas.map(async (escena) => {
            let query = 'SELECT ar.* FROM escenas es, archivos ar WHERE es.id = ar.escena_id and es.id = $1';
            let params = [escena.id];
            let response = await cliente.query(query, params);
            
            if(response.rowCount == 0) escena.archivo = null;
            else escena.archivo = response.rows[0];

            return escena;
        }));
        await cliente.end();
        
        return escenas;
    } catch (error) {
        return error;
    }
}

Archivo.save = async (archivo, escena_id) => {
    try {
        if(archivo.id) await Archivo.update(archivo);
        else await Archivo.saveNewArchivo(archivo, escena_id);
    } catch (error) {
        return error;
    }
}

Archivo.saveNewArchivo = async (archivo, escena_id) => {
    try {
        const cliente = Conexion.newConexion();

        await cliente.connect();
        const query = 'INSERT INTO archivos(nombre, local_path, tipo, url_portada, duracion, escena_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
        const params = [archivo.nombre, archivo.local_path, archivo.tipo, archivo.url_portada, archivo.duracion, escena_id];
        const response = await Promise.all(await cliente.query(query, params));
        await cliente.end();

        if(response.rowCount == 0) throw new Error("Error al insertar");
        

    } catch (error) {
        return error;
    }
}

Archivo.update = async (archivo) => {
    try {
        const cliente = Conexion.newConexion();

        await cliente.connect();
        const query = `
            UPDATE archivos
            SET nombre = $1, local_path = $2, tipo = $3, url_portada = $4, duracion = $5
            WHERE id = $6
        `;
        const params = [archivo.nombre, archivo.local_path, archivo.tipo, archivo.url_portada, archivo.duracion, archivo.id];
        const response = await Promise.all(await cliente.query(query, params));
        await cliente.end();

        if(response.rowCount == 0) throw new Error("Error al insertar");
    } catch (error) {
        return error;
    }
}
Archivo.saveListArchivo = (archivoLis) => {

}

module.exports = {Archivo};