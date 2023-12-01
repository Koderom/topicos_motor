const Escena = require('./Escena');
const {Conexion} = require('../database/conexion');

class Audio extends Escena{
    constructor(id, indice, titulo, contexto, autor, genero, guion_id, archivo_id){
        super(id, indice, contexto, 'A', guion_id, archivo_id);
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.archivo_id = archivo_id;
    }

    static async create(audio) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO audios(id, titulo, autor, genero, portada)
                VALUES ($1, $2, $3, $4, $5) RETURNING id;
            `;
            const params = [audio.id, audio.titulo, audio.autor, audio.genero, audio.portada];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            return error;
        }
    }

    static async getAudio(audio_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT escenas.*, audios.titulo, audios.autor, audios.genero, audios.portada
                FROM audios, escenas 
                WHERE escenas.id = audios.id and escenas.id = $1
            `;
            const params = [audio_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return error;
        }
    }
}

module.exports = Audio;