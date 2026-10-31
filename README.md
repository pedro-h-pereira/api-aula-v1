# API de Gerenciamento de Pedidos

API REST em Node.js e Express para cadastrar, listar, consultar e atualizar pedidos. O armazenamento é em memória: os dados são apagados quando o servidor reinicia.

## Instalação e execução

Requisitos: Node.js 18 ou superior e npm.

```bash
npm install
npm start
```

O servidor inicia em `http://localhost:3000`. Para outra porta, defina `PORT`. Em desenvolvimento, execute `npm run dev`.

## Arquitetura

- `routes/`: mapeia rotas para controladores.
- `controllers/`: coordena requisições, serviços e respostas HTTP.
- `services/`: aplica validações e regras de negócio.
- `app.js`: configura Express e tratamento de erros.
- `index.js`: inicia o servidor.
- `tests/`: testes automatizados com Jest e Supertest.

## Rotas

| Método | Rota | Resultado |
| --- | --- | --- |
| POST | `/pedidos` | 201 ao criar; 400 para dados inválidos |
| GET | `/pedidos` | 200 com a lista |
| GET | `/pedidos/:id` | 200 se existir; 404 se não existir |
| PATCH | `/pedidos/:id/status` | 200 ao atualizar; 400 para status/transição inválidos; 404 se não existir |

### Criar pedido

```http
POST /pedidos
Content-Type: application/json
```
```json
{ "cliente": "Carlos Silva", "tipo": "entrega", "valor": 350, "prioridade": "normal" }
```

Tipos: `entrega`, `retirada`. Prioridades: `normal`, `alta`. Cliente deve ser texto não vazio; valor deve ser numérico e maior que zero. O estado inicial é `recebido`.

### Atualizar status

```http
PATCH /pedidos/1/status
Content-Type: application/json
```
```json
{ "status": "em_preparacao" }
```

Estados: `recebido`, `em_preparacao`, `enviado`, `entregue`, `cancelado`. Transições: recebido → em_preparacao ou cancelado; em_preparacao → enviado, entregue ou cancelado; enviado → entregue ou cancelado. Entregue e cancelado são finais. Erros retornam `{ "erro": "mensagem" }`; erros inesperados retornam 500.

## Testes automatizados

```bash
npm test
```

## Testes manuais no Postman

Salve em `evidencias/` capturas reais mostrando método, URL, corpo quando aplicável, resposta e código HTTP:

1. `01-criacao.png`: POST válido, 201.
2. `02-validacao.png`: POST com cliente vazio ou valor inválido, 400.
3. `03-listagem.png`: GET /pedidos, 200.
4. `04-consulta-inexistente.png`: GET /pedidos/99999, 404.
5. `05-atualizacao.png`: PATCH /pedidos/1/status para em_preparacao, 200. Crie o pedido antes.

As capturas devem corresponder a requisições feitas no Postman. Reiniciar o servidor limpa os pedidos.

## Uso de IA

O ChatGPT foi utilizado como apoio para interpretar o enunciado, sugerir arquitetura em camadas, elaborar validações, testes e documentação. Foi aceita a sugestão de validar transições de status para impedir mudanças incompatíveis; por exemplo, um pedido recebido não pode passar diretamente para entregue. O aluno deve revisar, executar, compreender e adaptar o código antes da entrega.

## Entrega

Cada integrante deve realizar sua própria submissão, incluindo evidências individuais dos testes manuais. O enunciado pede pelo menos cinco commits significativos. Faça commits reais ao longo do desenvolvimento; não invente histórico retroativo.
