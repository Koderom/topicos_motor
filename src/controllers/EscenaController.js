const Escena = require("../models/Escena");

const EscenaController = {};

// EscenaController.getEscenas = async (req, res) => {
//     try {
//         const idGuion = req.query.idGuion;
//         const escenas = await Escena.getEscenas(idGuion);
//         Promise.all(
//             escenas.map( (escena) => {
                
//             })
//         );
//         res.status(200).send(dbResponse);
//     } catch (error) {
//         res.status(400).send(error);
//         return error;
//     }
// }

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

EscenaController.update = async (req, res) => {
    try {
        console.log('Actualizar escenas');
        const escena = req.body;
        const dbResponse = await Escena.update(escena);
        res.status(200).send(dbResponse);
    } catch (error) {
        res.status(400).send(error.message);
        return error;
    }
}

module.exports = {EscenaController};