const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();
const {GuionController} = require('../controllers/GuionController');
const {ServiceController} = require('../controllers/ServiceController')

router.get('/api', controller.index);
router.get('/api/start', controller.start);

router.post('/api/guion-save', GuionController.save);
router.get('/api/guion', GuionController.getGuion);

router.post('/api/contenido/create', ServiceController.create);
router.post('/wh/d-id', ServiceController.webhook_DID);

module.exports = router;