const Escena = require('./Escena');
const {Conexion} = require('../database/conexion');

class Video extends Escena{
    constructor(id, indice, contexto, titulo, autor, guion_id, archivo_id){
        super(id, indice, contexto, 'V',guion_id, archivo_id);
        
        this.titulo = titulo;
        this.autor = autor;
    }

    static async create(video) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO videos(id, titulo, autor) VALUES ($1, $2, $3) RETURNING id;
            `;
            const params = [video.id, video.titulo, video.autor];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            return error;
        }
    }

    static async getVideo(video_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT escenas.*, videos.titulo, videos.autor 
                FROM videos, escenas 
                WHERE escenas.id = videos.id and escenas.id = $1
            `;
            const params = [video_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return error;
        }
    }
}

module.exports = Video;