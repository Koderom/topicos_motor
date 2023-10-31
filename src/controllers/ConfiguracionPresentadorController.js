const ConfiguracionPresentador = require("../models/ConfiguracionPresentador");
const Presentador = require("../models/Presentador");

const ConfiguracionPresentadorController = {};

ConfiguracionPresentadorController.create = async (req, res) =>{
    try {
        const presentador_id = req.body.presentador_id;
        if(presentador_id){
            const presentador = await Presentador.getPresentador(presentador_id);
            if(presentador) req.body.presentadorUrl = presentador.image_url;
            else throw new Error(`Error: presentador ${presentador_id} no encontrado`);
        }
        console.log(req.body);
        const configPresentador = ConfiguracionPresentador.getInstanceFromObject(req.body);
        const idNewConfPresetnador = await ConfiguracionPresentador.create(configPresentador);
        if(idNewConfPresetnador) return res.status(200).send({presentadorId: idNewConfPresetnador});
        else return res.status(200).send("no se pudo crear");
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {ConfiguracionPresentadorController};