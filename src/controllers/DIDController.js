const { DIDService } = require("../Services/DIDService");
const Archivo = require("../models/Archivo");
const Escena = require("../models/Escena");
const Guion = require("../models/Guion");
const Interaccion = require("../models/Interaccion");
const Programacion = require("../models/programacion");
const SocketManager = require("../utils/SocketManager")

const DIDController = {}
DIDController.generarSaludo = async (req, res) => {
    try {
        console.log("Generando saludo");
        const data = req.body;
        console.log(data);
        const archivo = await DIDService.storeVideoDID(data);
        console.log("saludo generado");
        console.log(archivo)
        let escena = new Escena(null, null, "saludo de televidente", "S", null, archivo.id);
        const escenaId = await Escena.create(escena);
        escena = await Escena.getEscena(escenaId);
        if(escena) escena.archivo = archivo;
        else throw new error('error escena no encontrada');
        SocketManager.sendObjectAll({type: "wh-did-generar-saludo", body: escena});
        res.status(200).send('ok');
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
}
DIDController.generarPeticion = async (req, res) => {
    try {
        console.log("Generando peticion");
        const data = req.body;
        console.log(data);
        const archivoTemp = await Archivo.getArchivoFromName(data.id);
        const archivo = await DIDService.storeTempVideoDID(data);
        archivoTemp.nombre = archivo.nombre
        await Archivo.update(archivoTemp);

        const programacion = await Programacion.getProgramacionReproduciendo();
        if (!programacion) throw new Error('No existe programacion reproduciendo');
        const guion = await Guion.getGuionFromProgramacion(programacion.id);

        const escena = new Escena(null, null, "presentacion de la cancion pedida por el televidente", "P", guion.id, archivoTemp.id)
        const idEscena = Escena.create(escena);
        escena.archivo = archivoTemp;

        if(escena) escena.archivo = archivo;
        else throw new error('Error escena no encontrada');
        SocketManager.sendObjectAll({type: "wh-did-generar-peticion-presentacion", body: {
            id: data.id,
            escena: escena
        }});
        res.status(200).send('ok');
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
}

module.exports = {DIDController};