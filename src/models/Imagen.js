const Escena = require('./Escena');
const {Conexion} = require('../database/conexion');

class Imagen extends Escena{
    constructor(id, indice, contexto, descripcion, guion_id, archivo_id){
        super(id, indice, contexto, 'I', guion_id, archivo_id);      
        this.descripcion = descripcion;

        this.formulario = null;
        this.estado = 'C';
        this.generado = false;
    }

    static async create(imagen) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO imagenes(id, descripcion) VALUES ($1, $2) RETURNING id;
            `;
            const params = [imagen.id, imagen.descripcion];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            return error;
        }
    }

    static async getImagen(imagen_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT escenas.*, imagenes.descripcion
                FROM imagenes, escenas 
                WHERE escenas.id = imagenes.id and escenas.id = $1
            `;
            const params = [imagen_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return error;
        }
    }
}

module.exports = Imagen;