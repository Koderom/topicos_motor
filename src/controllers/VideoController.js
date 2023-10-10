const Archivo = require('../models/Archivo');
const Escena = require('../models/Escena');
const Video = require('../models/Video');

const VideoController = {};

VideoController.create = async (req, res) =>{
    try {
        const fileInfo = req.file;
        const data = req.body;

        const archivo = new Archivo(null, fileInfo.filename, fileInfo.mimetype, null, fileInfo.path, null);
        const archivoId = await Archivo.create(archivo);
        const video = new Video(null, data['video-indice'], data['video-contexto'], data['video-titulo'], data['video-autor'], data['video-guion-id'], archivoId);
        const escena = video.getEscenaInstance();
        const escenaId = await Escena.create(escena);
        if(escenaId){
            video.id = escenaId;
            await Video.create(video);
        }
        console.log(video);
        res.status(200).send(video);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {VideoController};