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
const { ProgramaController } = require('../controllers/ProgramaController');
const { ProgramacionController } = require('../controllers/ProgramacionController');
const { UsuarioController } = require('../controllers/UsuarioController');
const { PresentadorController } = require('../controllers/PresentadorController');
const { VocesController } = require('../controllers/VocesController');
const { ConfiguracionPresentadorController } = require('../controllers/ConfiguracionPresentadorController');
const { TwilioController } = require('../controllers/TwilioController');
const { DIDController } = require('../controllers/DIDController');

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
router.get('/api/test', PresentadorController.errorDbTest);
router.get('/api/start', controller.start);

router.post('/api/login', UsuarioController.login);

router.get('/api/programa', ProgramaController.getProgramas);
router.get('/api/programa/get-programa', ProgramaController.getPrograma);
router.get('/api/programa/estado/emision', ProgramaController.cambiarEstadoEmision);
router.get('/api/programa/estado/pendiente', ProgramaController.cambiarEstadoPendiente);
router.post('/api/programa/create',upload.single('programa_portada'), ProgramaController.create);

router.get('/api/programacion/get-programacion', ProgramacionController.getProgramacion);
router.get('/api/programacion', ProgramacionController.getProgramaciones);
router.post('/api/programacion/create', upload.none(),ProgramacionController.create);
router.get('/api/programacion/get_programa', ProgramacionController.getPrograma);
router.get('/api/programacion/reproduciendo/iniciando', ProgramacionController.iniciandoReproduccion);
router.get('/api/programacion/reproduciendo/finalizado', ProgramacionController.finalizandoReproduccion);

router.get('/api/guion', GuionController.getData);
router.get('/api/guion/get-guion', GuionController.getGuion);
router.get('/api/guion/programacion', GuionController.getProgramacion);

router.get('/api/escena/delete', EscenaController.delete);
router.post('/api/escena/update', EscenaController.update);
router.post('/api/video/create', upload.single('video-archivo'), VideoController.create);
router.post('/api/audio/create', upload.fields([{name:'audio-archivo', maxCount: 1}, {name: 'audio-portada', maxCount: 1}]), AudioController.create);
router.post('/api/imagen/create', upload.single('imagen-archivo'), ImagenController.create);
router.post('/api/interaccion/create', upload.none(), InteraccionController.create);


router.get('/api/presentador/getAll', PresentadorController.getAll);
router.post('/api/presentador/create', upload.none(), PresentadorController.create);

router.get('/api/voces/getAll', VocesController.getAll);
//router.post('/api/configuracionPresentador/create', upload.none(), ConfiguracionPresentadorController.create);
router.post('/api/contenido/create', ServiceController.music_create);
router.post('/wh/d-id', ServiceController.webhook_DID);
router.post('/wh/d-id/generar-saludo', DIDController.generarSaludo);
router.post('/wh/d-id/generar-peticion', DIDController.generarPeticion);
router.post('/wh/twilio', TwilioController.messageReceived);
module.exports = router;