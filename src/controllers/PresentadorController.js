const { DIDService } = require("../Services/DIDService");
const Presentador = require('../models/Presentador');

const PresentadorController = {}
PresentadorController.errorDbTest = async (req, res) => {
    try {
        const db_resp = await Presentador.errorDbTest();
        res.status(200).send(db_resp);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

PresentadorController.getAll = async (req, res) => {
    try {
        
        let presentadores = await Presentador.getAll();
        //if(presentadores.length == 0) presentadores = await cargarPresentadores();
        console.log(presentadores)
        res.status(200).send(presentadores);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
PresentadorController.create = async (req, res) => {
    try {   
        let params = req.body;
        let idPresentador = await Presentador.create(params);
        if(idPresentador){
            let presentadores = await Presentador.getAll();
            res.status(200).send(presentadores);
        }else throw new Error('Error al crear presentador');
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
PresentadorController.refresh = async (req, res) => {
    try {
        await cargarPresentadores();
        res.status(200).send('ok');
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
module.exports = {PresentadorController};

async function cargarPresentadores(){
    const presentadores = await DIDService.getPresentadores();
    await Promise.all(
        presentadores.map(async (element) => {
            const presentador = Presentador.getInstanceFromObject(element);
            const id = await Presentador.create(presentador);
            console.log("Presentador creado: " + id);
        })
    );
    return await Presentador.getAll();
}