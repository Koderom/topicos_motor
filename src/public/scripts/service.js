const servicios = {};

servicios.generarContenidoParaEscena = async (escena) => {
    return new Promise( async (resolve, reject) => {
        try {
            const response = await axios.post('http://127.0.0.1:3035/api/contenido/create',{
                tipo: escena.tipo,
                texto: escena.descripcion
            });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
}

servicios.nuevo = (guion) => {
    return new Promise( async (resolve, reject) => {
        try {
            const response = await axios.post('http://127.0.0.1:3035/api/guion-save',{
                escenas: guion.escenas
            });
            resolve(response.data.id);
        } catch (error) {
            reject(error);
        }
    });
}

servicios.actualizar = (guion) => {
    return new Promise( async (resolve, reject) => {
        try {
            const response = await axios.post('http://127.0.0.1:3035/api/guion-save',{
                id: guion.id,
                escenas: guion.escenas
            });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
}

servicios.cargar = (guion) => {
    return new Promise( async (resolve, reject) => {
        try {
            const response = await axios.get(`http://localhost:3035/api/guion?id=${guion.id}`,{});
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
}

export {servicios};