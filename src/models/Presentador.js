
const {Conexion} = require('../database/conexion');

class Presentador{
    constructor(
        id, presenter_id, created_at, thumbnail_url, preview_url, driver_id, image_url, gender, model_url, modified_at, owner_id
    ){
        this.id = id;
        this.presenter_id = presenter_id;
        this.created_at = created_at;
        this.thumbnail_url = thumbnail_url;
        this.preview_url = preview_url;
        this.driver_id = driver_id;
        this.image_url = image_url;
        this.gender = gender;
        this.model_url = model_url;
        this.modified_at = modified_at;
        this.owner_id = owner_id;
    }

    static getInstanceFromObject(object){
        return new Presentador(
            object.id, object.presenter_id, object.created_at, object.thumbnail_url, object.preview_url, object.driver_id, object.image_url, object.gender, object.model_url, object. modified_at, object.owner_id
        );
    }

    static async create(object) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO presentadores(nombre, genero, lenguaje, presentador_url, voz_provider_id)
                VALUES ($1, $2, $3, $4, $5) RETURNING id;
            `;
            const params = [object.nombre, object.genero, object.lenguaje, object.presentadorUrl, object.vozProviderId];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;    
        } catch (error) {
            return error;
        }
    }

    static async getPresentador(id) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM presentadores WHERE id = $1
            `;
            const params = [id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;
        } catch (error) {
            return error;
        }
    }

    static async getPresentadorFromGuionId(guionId) {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM presentadores pst
                INNER JOIN programas p on p.presentador_id  = pst.id
                INNER JOIN programaciones p2 on p2.programa_id = p.id
                INNER JOIN guiones g on g.programacion_id = p2.id
                where g.id = $1
            `;
            const params = [guionId];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;
        } catch (error) {
            return error;
        }
    }

    static async getAll() {
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM presentadores
            `;
            const response = await cliente.query(query);
            await cliente.end();

            if(response.rowCount > 0) return response.rows;
            else return [];    
        } catch (error) {
            return error;
        }
    }

    static async errorDbTest(){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM presentadores
            `;
            const response = await cliente.query(query);
            await cliente.end();

            return response.rows;
             
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}

module.exports = Presentador;