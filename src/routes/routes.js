const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.get('/', controller.index);
router.get('/start', controller.start);

module.exports = router;