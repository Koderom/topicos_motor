const {Conexion} = require('../database/conexion');

class ConfiguracionPresentador{
    constructor(id, nombre, presentadorUrl, lenguaje, genero, vozProviderId){
        this.id = id;
        this.nombre = nombre;
        this.presentadorUrl = presentadorUrl;
        this.lenguaje = lenguaje;
        this.genero = genero;
        this.vozProviderId = vozProviderId;
    }

    static getInstanceFromObject(object){
        return new ConfiguracionPresentador(object.id, object.nombre, object.presentadorUrl, object.lenguaje, object.genero, object.vozProviderId);
    }
    static async create(object) {
        try {
            console.log(object);
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO configuracion_presentadores(nombre, genero, lenguaje, presentadorUrl, vozProviderId)
                VALUES ($1, $2, $3, $4, $5) RETURNING id;
            `;
            const params = [object.nombre, object.genero, object.lenguaje, object.presentadorUrl, object.vozProviderId];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async getAll(audio_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT escenas.*, audios.titulo, audios.autor, audios.genero 
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

module.exports = ConfiguracionPresentador;