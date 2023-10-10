const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();
const {GuionController} = require('../controllers/GuionController');
const {ServiceController} = require('../controllers/ServiceController')
const path = require('path');
const multer = require('multer');
const { VideoController } = require('../controllers/VideoController');
const { AudioController } = require('../controllers/AudioController');
const { ImagenController } = require('../controllers/ImagenController');
const { InteraccionController } = require('../controllers/InteraccionController');
const { EscenaController } = require('../controllers/EscenaController');

const dotenv = require('dotenv').config();

const storage = multer.diskStorage({
    destination: process.env.STORAGE_DIRECTORY_PATH,
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const filename = path.basename(file.originalname, extname);
        cb(null, filename + extname);
    },
});
const upload = multer({storage});

router.get('/api', controller.index);
router.get('/api/start', controller.start);
//escenas
router.get('/api/escena/delete', EscenaController.delete);
//traer datos
router.get('/api/guion', GuionController.getData);
//rutas videos
router.post('/api/video/create', upload.single('video-archivo'), VideoController.create);

//rutas audios
router.post('/api/audio/create', upload.single('audio-archivo'), AudioController.create);

//rutas imagenes
router.post('/api/imagen/create', upload.single('imagen-archivo'), ImagenController.create);

//rutas interacciones
router.post('/api/interaccion/create', upload.none(), InteraccionController.create);

//router.post('/api/guion-save', GuionController.save);
//router.get('/api/guion', GuionController.getGuion);

router.post('/api/contenido/create', ServiceController.create);
router.post('/wh/d-id', ServiceController.webhook_DID);

module.exports = router;