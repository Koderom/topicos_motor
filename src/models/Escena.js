const {Conexion} = require('../database/conexion');

class Escena{
    constructor(id, indice, contexto, tipo_escena, guion_id, archivo_id){
        this.id = id;
        this.indice = indice;
        this.contexto = contexto;
        this.tipo_escena = tipo_escena;
        this.guion_id = guion_id;
        this.archivo_id = archivo_id;
    }

    getEscenaInstance(){
        return new Escena(this.id, this.indice, this.contexto, this.tipo_escena, this.guion_id, this.archivo_id);
    }

    static async create(escena){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                INSERT INTO escenas(indice, contexto, tipo_escena, guion_id, archivo_id)
                VALUES ($1, $2, $3, $4, $5) RETURNING id
            `;
            const params = [escena.indice, escena.contexto, escena.tipo_escena, escena.guion_id, escena.archivo_id];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            return error;
        }
    }
    static async delete(escena_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                DELETE FROM escenas WHERE id = $1
            `;
            const params = [escena_id];
            const response = await cliente.query(query, params);
            await cliente.end();
            return response;
        } catch (error) {
            return error;
        }
    }
    static async getEscenas(guion_id){
        try {
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM  escenas WHERE guion_id = $1 ORDER BY indice 
            `;
            const params = [guion_id];
            const response = await cliente.query(query, params);
            await cliente.end();
            if(response.rowCount > 0) return response.rows;
            else return [];
        } catch (error) {
            return error;
        }
    }

}

module.exports = Escena;