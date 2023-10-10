const Escena = require("../models/Escena");

const EscenaController = {};

EscenaController.delete = async (req, res) => {
    try {
        console.log(req.query);
        const escena_id = req.query.escena_id;
        const dbResponse = await Escena.delete(escena_id);
        res.status(200).send(dbResponse);
    } catch (error) {
        res.status(400).send(error);
        return error;
    }
}

module.exports = {EscenaController};