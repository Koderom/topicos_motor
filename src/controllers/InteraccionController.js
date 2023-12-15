const Archivo = require('../models/Archivo');
const Escena = require('../models/Escena');
const Interaccion = require('../models/Interaccion');
const Presentador = require('../models/Presentador');
const {DIDService} = require('../Services/DIDService');

const InteraccionController = {};

InteraccionController.create = async (req, res) =>{
    try {
        console.log("creando interaccion ------------------->");
        const data = req.body;
        const guionID = data['interaccion-guion-id'];
        const presentador = await Presentador.getPresentadorFromGuionId(guionID);
        console.log(data);
        const interaccion = new Interaccion(null, data['interaccion-indice'], data['interaccion-contexto'], data['interaccion-texto'], data['interaccion-guion-id'], null);
        const clipDiD = await DIDService.talkGenerate(interaccion.texto, presentador);
        const escena = interaccion.getEscenaInstance();
        const escenaId = await Escena.create(escena);
        if(escenaId){
            interaccion.id = escenaId;
            interaccion.clip_id = clipDiD.id;
            await Interaccion.create(interaccion);
        }else  throw new Error('error en la peticion a DID service');
        console.log(interaccion);
        res.status(200).send(interaccion);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {InteraccionController};