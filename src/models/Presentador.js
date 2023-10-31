
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
                INSERT INTO presentadores(presenter_id, created_at, thumbnail_url, preview_url, driver_id, image_url, gender, model_url, modified_at, owner_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;
            `;
            const params = [object.presenter_id, object.created_at, object.thumbnail_url, object.preview_url, object.driver_id, object.image_url, object.gender, object.model_url, object. modified_at, object.owner_id];
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
}

module.exports = Presentador;