const Guion = require("../models/Guion");

const GuionController = {};

GuionController.getData = async (req, res) => {
    try {
        console.log(req.query);
        const guionId = req.query.guion_id;
        const guion = await Guion.getGuion(guionId);
        guion.escenas = await Guion.getEscenas(guionId);
        console.log(guion)
        res.status(200).send(guion);
    } catch (error) {
        res.status(400).send(error);
        return error;
    }
}

module.exports = {GuionController}