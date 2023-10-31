const { DIDService } = require("../Services/DIDService");
const Presentador = require('../models/Presentador');

const VocesController = {}
VocesController.getAll = async (req, res) => {
    try {
        const voces = await DIDService.getVoicesAvailable();
        res.status(200).send(voces);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
module.exports = {VocesController};