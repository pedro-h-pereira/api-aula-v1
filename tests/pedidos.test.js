const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');
const service = require('../services/pedidoService');
let servidor;
let baseUrl;
before(() => new Promise((resolve) => {
  servidor = app.listen(0, () => {
    baseUrl = `http://127.0.0.1:${servidor.address().port}`;
    resolve();
  });
}));
after(() => new Promise((resolve) => servidor.close(resolve)));
beforeEach(() => service.limpar());
const pedido = { cliente: 'Carlos Silva', tipo: 'entrega', valor: 350, prioridade: 'normal' };
async function requisitar(caminho, opcoes = {}) {
  return fetch(baseUrl + caminho, { ...opcoes, headers: { 'content-type': 'application/json', ...opcoes.headers } });
}
test('cria pedido com HTTP 201', async () => {
  const r = await requisitar('/pedidos', { method: 'POST', body: JSON.stringify(pedido) });
  assert.equal(r.status, 201);
  assert.deepEqual(await r.json(), { id: 1, ...pedido, status: 'recebido' });
});
test('rejeita cliente vazio com HTTP 400', async () => {
  const r = await requisitar('/pedidos', { method: 'POST', body: JSON.stringify({ ...pedido, cliente: '  ' }) });
  assert.equal(r.status, 400);
});
test('lista pedidos com HTTP 200', async () => {
  await requisitar('/pedidos', { method: 'POST', body: JSON.stringify(pedido) });
  const r = await requisitar('/pedidos');
  assert.equal(r.status, 200);
  assert.equal((await r.json()).length, 1);
});
test('retorna HTTP 404 para pedido inexistente', async () => {
  assert.equal((await requisitar('/pedidos/999')).status, 404);
});
test('atualiza status por transição válida', async () => {
  await requisitar('/pedidos', { method: 'POST', body: JSON.stringify(pedido) });
  const r = await requisitar('/pedidos/1/status', { method: 'PATCH', body: JSON.stringify({ status: 'em_preparacao' }) });
  assert.equal(r.status, 200);
  assert.equal((await r.json()).status, 'em_preparacao');
});
test('rejeita transição inválida com HTTP 400', async () => {
  await requisitar('/pedidos', { method: 'POST', body: JSON.stringify(pedido) });
  assert.equal((await requisitar('/pedidos/1/status', { method: 'PATCH', body: JSON.stringify({ status: 'entregue' }) })).status, 400);
});
