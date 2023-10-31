const { DIDService } = require("../Services/DIDService");
const Presentador = require('../models/Presentador');

const PresentadorController = {}
PresentadorController.getAll = async (req, res) => {
    try {
        
        let presentadores = await Presentador.getAll();
        if(presentadores.length == 0) presentadores = await cargarPresentadores();
        res.status(200).send(presentadores);
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