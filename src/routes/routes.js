const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();
const {GuionController} = require('../controllers/GuionController');

router.get('/', controller.index);
router.get('/start', controller.start);

router.post('/api/guion-save', GuionController.save);
router.get('/api/guion', GuionController.getGuion);

router.post('/api/avatar-generate');
router.post('/api/music-search');

module.exports = router;