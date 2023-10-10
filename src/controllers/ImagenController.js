const Archivo = require('../models/Archivo');
const Escena = require('../models/Escena');
const Imagen = require('../models/Imagen');

const ImagenController = {};

ImagenController.create = async (req, res) =>{
    try {
        const fileInfo = req.file;
        const data = req.body;
        const archivo = new Archivo(null, fileInfo.filename, fileInfo.mimetype, null, fileInfo.path, null);
        const archivoId = await Archivo.create(archivo);
        const imagen = new Imagen(null, data['imagen-indice'], data['imagen-contexto'],  data['imagen-descripcion'], data['imagen-guion-id'], archivoId);
        const escena = imagen.getEscenaInstance();
        const escenaId = await Escena.create(escena);
        if(escenaId){
            imagen.id = escenaId;
            await Imagen.create(imagen);
        }
        console.log(imagen);
        res.status(200).send(imagen);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {ImagenController};