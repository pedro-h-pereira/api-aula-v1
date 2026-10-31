const express = require('express');
const controller = require('../controllers/pedidoController');
const router = express.Router();
router.post('/', controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.consultar);
router.patch('/:id/status', controller.atualizarStatus);
module.exports = router;
