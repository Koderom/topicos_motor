const {Conexion} = require('../database/conexion');

class Usuario{
    constructor(id, name, passoword){
        this.id = id;
        this.name = name;
        this.passoword = passoword;
    }
    
    getInstaceFromObject(object){
        return new Usuario(object.id, object.name, object.password);
    }

    static async getUserFromName(name){
        try {
            console.log('buscando resultados para usuario: '+ name);
            const cliente = Conexion.newConexion();
            await cliente.connect();
            const query = `
                SELECT * FROM usuarios WHERE usuarios.name = $1
            `;
            const params = [name];
            const response = await cliente.query(query, params);
            await cliente.end();

            if(response.rowCount > 0) return response.rows[0];
            else return null;    
        } catch (error) {
            return error;
        }
    }

    static async validarUsuario(credenciales){
        try {
            const user = await Usuario.getUserFromName(credenciales.name);
            if(user && user.password === credenciales.password) return user;
            else return null;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = Usuario;