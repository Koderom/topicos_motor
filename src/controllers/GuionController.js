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
        console.log(error);
        res.status(400).send(error.message);
        return error;
    }
}

GuionController.getGuion = async (req, res) => {
    try {
        console.log(req.query);
        const idProgramacion = req.query.idProgramacion;
        const guion = await Guion.getGuionFromProgramacion(idProgramacion);
        guion.escenas = await Guion.getEscenas(guion.id);
        console.log(guion)
        res.status(200).send(guion);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
        return error;
    }
}

GuionController.getProgramacion = async (req, res) => {
    try {
        console.log(req.query);
        const guionId = req.query.idGuion;
        const programacion = await Guion.getProgamacion(guionId);
        console.log(programacion)
        if(programacion) res.status(200).send(programacion);
        else throw new Error(`No se encontro la programacion para el guion: ${guionId}`);
    } catch (error) {
        res.status(400).send(error);
        return error;
    }
}

module.exports = {GuionController}