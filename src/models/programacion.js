const {Conexion} = require('../database/conexion');

class Programacion{
    constructor(titulo, nro_episodio, descripcion, fecha_emision, programa_id){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.nro_episodio = nro_episodio;
        this.fecha_emision = fecha_emision;
        this.programa_id = programa_id;
    }
    static getInstanceFromObject(object) {
        return new Programacion(object.titulo, object.nro_episodio, object.descripcion, object.fecha_emision, object.programa_id);
    }

    static async create(programacion) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO programaciones(titulo, nro_episodio, descripcion, fecha_emision, programa_id) 
                VALUES ($1, $2, $3, $4, $5) RETURNING id;
            `;
            const params = [programacion.titulo, programacion.nro_episodio, programacion.descripcion, programacion.fecha_emision, programacion.programa_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    static async getAll(idPrograma){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT programaciones.*, guiones.id as "guion_id"
                FROM  programaciones 
                INNER JOIN guiones ON guiones.programacion_id = programaciones.id
                INNER JOIN programas ON programaciones.programa_id = programas.id
                WHERE programas.id = $1
            `;
            const params = [idPrograma]
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows;
            else return [];    
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}

module.exports = Programacion;