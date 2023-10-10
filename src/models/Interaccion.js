const Escena = require('./Escena');
const {Conexion} = require('../database/conexion')

class Interaccion extends Escena{
    constructor(id, indice, contexto, idioma, texto,  guion_id, avatar_id, archivo_id){
        super(id, indice, contexto, 'D', guion_id, archivo_id);
        this.idioma = idioma;
        this.texto = texto;
        this.avatar_id = avatar_id;

        this.clip_id = null;
        this.formulario = null;
        this.estado = 'C';
        this.generado = false;
    }

    static async create(interaccion) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO interacciones(id, idioma, texto, avatar_id, clip_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;
            `;
            const params = [interaccion.id, interaccion.idioma, interaccion.texto, interaccion.avatar_id, interaccion.clip_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            return error;
        }
    }
    static async updateWhitClip(clip_id, archivo_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                UPDATE escenas 
                SET archivo_id = $1
                FROM interacciones 
                WHERE escenas.id = interacciones.id and interacciones.clip_id = $2
            `;
            const params = [archivo_id, clip_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            return error;
        }
    }

    static async getInteraccion(interaccion_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT escenas.*, interacciones.idioma, interacciones.texto, interacciones.avatar_id, interacciones.clip_id
                FROM interacciones, escenas 
                WHERE escenas.id = interacciones.id and escenas.id = $1
            `;
            const params = [interaccion_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return error;
        }
    }
}
module.exports = Interaccion;