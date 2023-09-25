const {AudiusService} = require('../Services/AudiusService');
const {DIDService} = require('../Services/DIDService');
const ServiceController = {};

ServiceController.create = async (req, res) => {
    try {
        let respuesta = {};
        if(req.body.tipo == 'A') respuesta = await AudiusService.searchMusicByName(req.body.texto);
        // else if(req.body.tipo == 'I') respuesta = DIDService.clipGenerate(req.body.texto);
        return res.status(200).send(respuesta);
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {ServiceController};