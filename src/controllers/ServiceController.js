const {AudiusService} = require('../Services/AudiusService');
const {DIDService} = require('../Services/DIDService');
const SocketManager = require('../utils/SocketManager');
const ServiceController = {};

ServiceController.create = async (req, res) => {
    try {
        let respuesta = {};
        if(req.body.tipo == 'A') respuesta = await AudiusService.searchMusicByName(req.body.texto);
        else if(req.body.tipo == 'I') respuesta = await DIDService.clipGenerate(req.body.texto);
        res.status(200).send(respuesta);
    } catch (error) {
        return res.status(400).send(error);
    }
}

ServiceController.webhook_DID = async (req, res) => {
    try {
        console.log("intentando almacenar interaccion");
        const data = req.body;
        console.log(data);
        const info = await DIDService.storeVideoDID(data);
        console.log(info)
        SocketManager.sendObjectAll({type: "wh-did-respuesta", body: info});
        res.status(200).send('ok');
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {ServiceController};