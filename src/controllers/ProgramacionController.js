const Programa = require("../models/Programa");
const Programacion = require("../models/programacion");
const Guion = require("../models/Guion");
const dotenv = require('dotenv').config();
const ProgramacionController = {}

const url = process.env.SERVER_HOST;


ProgramacionController.getProgramacion = async (req, res) => {
    try {
        const idProgramacion = req.query.idProgramacion;
        const programacion = await Programacion.getProgramacion(idProgramacion);
        res.status(200).send(programacion);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

ProgramacionController.create = async (req, res) => {
    try {
        console.log(req.body);
        const mProgramacion = Programacion.getInstanceFromObject(req.body);
        const idProgramacion = await Programacion.createProgramacion(mProgramacion);
        const mGuion = new Guion('titulo', idProgramacion);
        const idGuion = await Guion.create(mGuion);

        console.log(idProgramacion);
        res.redirect(`${url}/pages/guiones/index.html?idProgramacion=${idProgramacion}&idGuion=${idGuion}`);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

ProgramacionController.getProgramaciones = async (req, res) => {
    try {
        const idPrograma = req.query.idPrograma;
        const programas = await Programacion.getProgramaciones(idPrograma);
        res.status(200).send(programas);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
ProgramacionController.getPrograma = async (req, res) => {
    try {
        const idProgramacion = req.query.idProgramacion;
        const programa = await Programa.getProgramaFromProgramacion(idProgramacion);
        res.status(200).send(programa);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

ProgramacionController.iniciandoReproduccion = async (req, res) => {
    try {
        const idProgramacion = req.query.idProgramacion;
        const programacion = await Programacion.getProgramacion(idProgramacion);
        const programacionReproduciendo = await Programacion.getProgramacionReproduciendo();
        if(programacionReproduciendo) programacionReproduciendo.reproduciendo = 0;
        programacion.reproduciendo = 1;
        await Programacion.updateProgramacion(programacionReproduciendo);
        await Programacion.updateProgramacion(programacion);
        res.status(200).send('Reproduciendo programacion');
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}



ProgramacionController.finalizandoReproduccion = async (req, res) => {
    try {
        const idProgramacion = req.query.idProgramacion;
        const programacion = await Programacion.getProgramacion(idProgramacion);
        programacion.reproduciendo = 0;
        await Programacion.updateProgramacion(programacion);
        res.status(200).send("Reproduccion finalizada");
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {ProgramacionController};