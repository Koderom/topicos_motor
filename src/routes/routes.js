const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();
const {GuionController} = require('../controllers/GuionController');
const {ServiceController} = require('../controllers/ServiceController')

router.get('/', controller.index);
router.get('/start', controller.start);
router.post('/api/guion-save', GuionController.save);
router.get('/api/guion', GuionController.getGuion);
router.post('/api/contenido/create', ServiceController.create);

module.exports = router;