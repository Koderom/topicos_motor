const {Conexion} = require('../database/conexion');

class Programa{
    constructor(titulo, descripcion, portada, genero, clasificacion, fecha_inicio, estado, horario_emision, duracion,presentador_id){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.portada = portada;
        this.genero = genero;
        this.clasificacion = clasificacion;
        this.fecha_inicio = fecha_inicio;
        this.estado = estado;
        this.horario_emision = horario_emision;
        this.duracion = duracion;
        this.presentador_id = presentador_id;
    }
    
    static getInstanceFromObject(object) {
        return new Programa(object.titulo,object.descripcion, object.portada, object.genero, object.clasificacion, object.fecha_inicio, object.estado, object.horario_emision, object.duracion, object.presentador_id);
    }

    static async createPrograma(programa) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO programas(titulo, descripcion, portada, genero, clasificacion, fecha_inicio, estado, horario_emision, duracion, presentador_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;
            `;
            const params = [programa.titulo, programa.descripcion, programa.portada, programa.genero, programa.clasificacion, programa.fecha_inicio, programa.estado, programa.horario_emision, programa.duracion, programa.presentador_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
    static async updatePrograma(programa){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                UPDATE programas
                SET titulo=$2, descripcion=$3, portada=$4, genero=$5, clasificacion=$6, fecha_inicio=$7, estado=$8, horario_emision=$9, duracion=$10, presentador_id=$11
                WHERE id = $1
                RETURNING *
            `;
            const params = [programa.id, programa.titulo, programa.descripcion, programa.portada, programa.genero, programa.clasificacion, programa.fecha_inicio, programa.estado, programa.horario_emision, programa.duracion, programa.presentador_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getProgramas(){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM  programas
            `;
            const response = await cliente.query(query);
            await cliente.end();

            if(response.rowCount > 0) return response.rows;
            else return [];    
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getPrograma(idProgramcion){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT programas.*
                FROM  programas
                INNER JOIN programaciones ON programaciones.programa_id = programas.id
                WHERE programacion.id = idProgramacion
            `;
            const params = [idProgramcion]
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async existePrograma(idPrograma){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM  programas WHERE id=$1
            `;
            const params = [idPrograma];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return true;
            return false;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Programa;