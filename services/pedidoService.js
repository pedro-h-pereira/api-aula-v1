const TIPOS = ['entrega', 'retirada'];
const PRIORIDADES = ['normal', 'alta'];
const TRANSICOES = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'entregue', 'cancelado'],
  enviado: ['entregue', 'cancelado'],
  entregue: [],
  cancelado: [],
};
let pedidos = [];
let proximoId = 1;
function erro(tipo, message) {
  const e = new Error(message);
  e.tipo = tipo;
  return e;
}
function validarId(id) {
  if (!/^\d+$/.test(id) || Number(id) < 1) throw erro('nao_encontrado', 'Pedido não encontrado.');
}
function criar(dados) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) throw erro('validacao', 'Envie um objeto JSON com os dados do pedido.');
  const cliente = typeof dados.cliente === 'string' ? dados.cliente.trim() : '';
  if (!cliente) throw erro('validacao', 'Cliente é obrigatório e não pode ficar vazio.');
  if (typeof dados.valor !== 'number' || !Number.isFinite(dados.valor) || dados.valor <= 0) throw erro('validacao', 'Valor deve ser numérico e maior que zero.');
  if (!TIPOS.includes(dados.tipo)) throw erro('validacao', `Tipo inválido. Use: ${TIPOS.join(', ')}.`);
  if (!PRIORIDADES.includes(dados.prioridade)) throw erro('validacao', `Prioridade inválida. Use: ${PRIORIDADES.join(', ')}.`);
  const pedido = { id: proximoId++, cliente, tipo: dados.tipo, valor: dados.valor, prioridade: dados.prioridade, status: 'recebido' };
  pedidos.push(pedido);
  return pedido;
}
function listar() { return pedidos; }
function consultar(id) {
  validarId(id);
  const pedido = pedidos.find((item) => item.id === Number(id));
  if (!pedido) throw erro('nao_encontrado', 'Pedido não encontrado.');
  return pedido;
}
function atualizarStatus(id, dados) {
  const pedido = consultar(id);
  if (!dados || typeof dados !== 'object' || Array.isArray(dados) || typeof dados.status !== 'string') throw erro('validacao', 'Envie o campo status como texto.');
  const estados = Object.keys(TRANSICOES);
  if (!estados.includes(dados.status)) throw erro('validacao', `Status inválido. Use: ${estados.join(', ')}.`);
  if (!TRANSICOES[pedido.status].includes(dados.status)) throw erro('validacao', `Transição de ${pedido.status} para ${dados.status} não permitida.`);
  pedido.status = dados.status;
  return pedido;
}
function limpar() { pedidos = []; proximoId = 1; }
module.exports = { criar, listar, consultar, atualizarStatus, limpar };
