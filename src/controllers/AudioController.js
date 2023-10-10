const Archivo = require('../models/Archivo');
const Escena = require('../models/Escena');
const Audio = require('../models/Audio');

const AudioController = {};

AudioController.create = async (req, res) =>{
    try {
        const fileInfo = req.file;
        const data = req.body;

        const archivo = new Archivo(null, fileInfo.filename, fileInfo.mimetype, null, fileInfo.path, null);
        const archivoId = await Archivo.create(archivo);
        const audio = new Audio(null, data['audio-indice'], data['audio-titulo'], data['audio-contexto'],  data['audio-autor'], data['audio-genero'], data['audio-guion-id'], archivoId);
        const escena = audio.getEscenaInstance();
        const escenaId = await Escena.create(escena);
        if(escenaId){
            audio.id = escenaId;
            await Audio.create(audio);
        }
        console.log(audio);
        res.status(200).send(audio);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {AudioController};