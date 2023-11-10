const {Conexion} = require('../database/conexion');
const Archivo = require('./Archivo');
const Audio = require('./Audio');
const Escena = require('./Escena');
const Imagen = require('./Imagen');
const Interaccion = require('./Interaccion');
const Video = require('./Video');

class Guion{
    constructor(titulo, programacion_id){
        this.id = null
        this.titulo = titulo;
        this.programacion_id = programacion_id;
        this.escenas = [];
        this.formulario;
    }

    static getInstanceFromObject(object){
        const mGion = new Guion(object.titulo, object.programacion_id);
        if(object.id) mGion.id = object.id;
        return mGion;
    }

    static async create(guion){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO guiones(titulo, programacion_id) VALUES ($1,$2) RETURNING id
            `;
            const params = [guion.titulo, guion.programacion_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            return error;
        }
    }
    static async getGuion(guion_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM guiones WHERE id = $1
            `;
            const params = [guion_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return {};    
        } catch (error) {
            throw error;
        }
    }
    
    static async getArchivosGuion(guion_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT archivos.*
                FROM archivos, escenas
                WHERE archivos.id = escenas.archivo_id and escenas.guion_id = $1
            `;
            const params = [guion_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows;
            else return null;    
        } catch (error) {
            return error;
        }
    }
    static async getProgamacion(guion_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT programaciones.*
                FROM programaciones
                INNER JOIN guiones ON guiones.programacion_id = programaciones.id
                WHERE guiones.id = $1
            `;
            const params = [guion_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return error;
        }
    }

    static async getEscenas(guion_id){
        try {
            let escenas = await Escena.getEscenas(guion_id);
            escenas = await Promise.all(
                escenas.map( async (escena) => {
                    const escenaWithChild = await this.getChildEscena(escena);
                    if(escenaWithChild){
                        escenaWithChild.archivo = await Archivo.getArchivo(escena.archivo_id);
                        return escenaWithChild;
                    }
                }).filter( async escena => escena instanceof Promise)
            );
            escenas = escenas.filter( escena => escena != undefined)
            
            return escenas;
        } catch (error) {
            return error;
        }
    }

    static async getChildEscena(escena){
        try {
            let data = {};
            switch (escena.tipo_escena) {
                case 'A':
                   data = await Audio.getAudio(escena.id);
                break;
                case 'I':
                    data = await Imagen.getImagen(escena.id);
                break;
                case 'V':
                    data = await Video.getVideo(escena.id);
                break;
                case 'D':
                    data = await Interaccion.getInteraccion(escena.id);
                break;
            }
            return data;
        } catch (error) {
            return error;
        }
    }

}

module.exports = Guion;