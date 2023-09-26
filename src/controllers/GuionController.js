const {Guion} = require('../models/Guion')

const GuionController = {};

const guionTest ={
    "id": 1,
    "escenas": [
      {
        "id": 1,
        "descripcion": "escena 1 descripcion updt",
        "tipo": "I",
        "guion_id": 1,
        "archivo": {
          "id": 1,
          "nombre": "video 1",
          "local_path": "ruta de archivo local 1 udpt",
          "tipo": ".mp4",
          "url_portada": "url_portada 1",
          "duracion": "10:30",
          "escena_id": 1
        }
      },
      {
        "id": 2,
        "descripcion": "escena 2 descripcion",
        "tipo": "A",
        "guion_id": 1,
        "archivo": {
          "id": 2,
          "nombre": "video 1",
          "local_path": "ruta de archivo local 1",
          "tipo": ".mp3",
          "url_portada": "url_portada 1",
          "duracion": "10:30",
          "escena_id": 2
        }
      },
      {
        "id": 3,
        "descripcion": "escena 3 descripcion",
        "tipo": "I",
        "guion_id": 1,
        "archivo": {
          "id": 3,
          "nombre": "video 1",
          "local_path": "ruta de archivo local 1",
          "tipo": ".mp4",
          "url_portada": "url_portada 3",
          "duracion": "10:30",
          "escena_id": 3
        }
      },
      {
        "id": 4,
        "descripcion": "escena 4 descripcion",
        "tipo": "A",
        "guion_id": 1,
        "archivo": null
      },
      {
        "id": 5,
        "descripcion": "escena 5 descripcion",
        "tipo": "I",
        "guion_id": 1,
        "archivo": null
      }
    ]
  }

GuionController.save = async (req, res) => {
    try {
        const gion = req.body;
        console.log(gion);
        const id = await Guion.saveGuion(gion);
        console.log(id);
        res.status(200).send({id});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

GuionController.getGuion = async (req, res) => {
    try {
        const gionID = req.query.id || 1;
        const guion = await Guion.findGuionByID(gionID);
        res.status(200).send(guion);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {GuionController};