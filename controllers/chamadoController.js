const chamadoService = require('../services/chamadoServices')

function criar(req, res){
    console.log("1 - CONTROLLER recebeu", req.body);
    const chamado = chamadoService.criar(req.body);
    return res.status(201).json(chamado);
}

module.exports = { criar }