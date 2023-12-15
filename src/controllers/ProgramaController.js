const Programa = require("../models/Programa");
const dotenv = require('dotenv').config();
const ProgramaController = {}

const url = process.env.SERVER_HOST;

ProgramaController.create = async (req, res) => {
    try {
        req.body.portada = req.file.filename;
        const mPrograma = Programa.getInstanceFromObject(req.body);
        console.log(mPrograma);
        const idPrograma = await Programa.createPrograma(mPrograma);
        res.status(200).send('ok');
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
ProgramaController.getProgramas = async (req, res) => {
    try {
        const programas = await Programa.getProgramas();
        res.status(200).send(programas);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
ProgramaController.getPrograma = async (req, res) => {
    try {
        const idPrograma = req.query.idPrograma;
        const programa = await Programa.getPrograma(idPrograma);
        res.status(200).send(programa);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

ProgramaController.cambiarEstadoEmision = async (req, res) => {
    try {
        const idPrograma = req.query.idPrograma;
        const programa = await Programa.getPrograma(idPrograma);
        programa.estado = 'emision';
        await Programa.updatePrograma(programa);
        res.status(200).send(programa);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

ProgramaController.cambiarEstadoPendiente = async (req, res) => {
    try {
        const idPrograma = req.query.idPrograma;
        const programa = await Programa.getPrograma(idPrograma);
        programa.estado = 'pendiente';
        await Programa.updatePrograma(programa);
        res.status(200).send(programa);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {ProgramaController};