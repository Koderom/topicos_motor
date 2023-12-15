const {Conexion} = require('../database/conexion');

class Archivo{
    constructor(id, nombre, tipo, duracion, local_path, fecha_hora_creacion){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.duracion = duracion;
        this.local_path = local_path;
        this.fecha_hora_creacion = fecha_hora_creacion;
    }

    static async create(archivo){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO archivos(nombre, tipo, duracion, local_path, fecha_hora_creacion)
                VALUES ($1, $2, $3, $4, $5) RETURNING id
            `;
            const params = [archivo.nombre, archivo.tipo, archivo.duracion, archivo.local_path, archivo.fecha_hora_creacion];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            return error;
        }
    }

    static async update(archivo){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                update archivos
                set nombre=$1, tipo=$2, duracion=$3, local_path$4, fecha_hora_creacion=$5
                where id = $6
            `;
            const params = [archivo.nombre, archivo.tipo, archivo.duracion, archivo.local_path, archivo.fecha_hora_creacion, archivo.id];
            const response = await cliente.query(query, params);
            await cliente.end(); 
        } catch (error) {
            return error;
        }
    }

    static async getArchivoFromEscena(escena_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT arc.* 
                FROM archivos arc
                inner join escenas esc on esc.archivo_id =  arc.id
                WHERE arc.id = $1
            `;
            const params = [escena_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return null;
        }
    }

    static async getArchivoFromName(nombre){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT arc.* 
                FROM archivos arc
                WHERE arc.nombre = $1
            `;
            const params = [nombre];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return null;
        }
    }

    static async getArchivo(archivo_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT arc.* 
                FROM archivos arc
                WHERE arc.id = $1
            `;
            const params = [archivo_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return null;
        }
    }
}





module.exports = Archivo;