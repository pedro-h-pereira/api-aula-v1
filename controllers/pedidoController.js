const service = require('../services/pedidoService');
function tratarErro(res, next, erro) {
  if (erro.tipo === 'validacao') return res.status(400).json({ erro: erro.message });
  if (erro.tipo === 'nao_encontrado') return res.status(404).json({ erro: erro.message });
  return next(erro);
}
function criar(req, res, next) {
  try { return res.status(201).json(service.criar(req.body)); } catch (erro) { return tratarErro(res, next, erro); }
}
function listar(req, res, next) {
  try { return res.status(200).json(service.listar()); } catch (erro) { return next(erro); }
}
function consultar(req, res, next) {
  try { return res.status(200).json(service.consultar(req.params.id)); } catch (erro) { return tratarErro(res, next, erro); }
}
function atualizarStatus(req, res, next) {
  try { return res.status(200).json(service.atualizarStatus(req.params.id, req.body)); } catch (erro) { return tratarErro(res, next, erro); }
}
module.exports = { criar, listar, consultar, atualizarStatus };
