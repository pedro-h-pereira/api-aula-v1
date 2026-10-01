const express = require('express');
const chamadoController = require('../controllers/chamadoController')

const router = express.Router();

router.post('/', chamadoController.criar);

module.exports = router;

