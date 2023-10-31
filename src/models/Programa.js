const {Conexion} = require('../database/conexion');

class Programa{
    constructor(titulo, descripcion, genero, clasificacion, fecha_inicio, estado, horario_emision, duracion,presentador_id){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.genero = genero;
        this.clasificacion = clasificacion;
        this.fecha_inicio = fecha_inicio;
        this.estado = estado;
        this.horario_emision = horario_emision;
        this.duracion = duracion;
        this.presentador_id = presentador_id;
    }
    
    static getInstanceFromObject(object) {
        return new Programa(object.titulo,object.descripcion, object.genero, object.clasificacion, object.fecha_inicio, object.estado, object.horario_emision, object.duracion, object.presentador_id);
    }

    static async create(programa) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO programas(titulo, descripcion, genero, clasificacion, fecha_inicio, estado, horario_emision, duracion, presentador_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
            `;
            const params = [programa.titulo, programa.descripcion, programa.genero, programa.clasificacion, programa.fecha_inicio, programa.estado, programa.horario_emision, programa.duracion, programa.presentador_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    static async getAll(){
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
            return error.message;
        }
    }
}

module.exports = Programa;