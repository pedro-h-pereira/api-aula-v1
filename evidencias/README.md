# Evidências dos testes manuais

Esta pasta reúne as capturas dos testes realizados no Postman para a API de gerenciamento de pedidos. Cada imagem mostra a requisição enviada e o resultado recebido.

| Arquivo | Cenário | Resultado esperado |
| --- | --- | --- |
| `01-criacao.png` | Cadastro de pedido válido (`POST /pedidos`) | HTTP 201 |
| `02-validacao.png` | Cadastro com cliente vazio (`POST /pedidos`) | HTTP 400 |
| `03-listagem.png` | Listagem de pedidos (`GET /pedidos`) | HTTP 200 |
| `04-consulta-inexistente.png` | Consulta de ID inexistente (`GET /pedidos/99999`) | HTTP 404 |
| `05-atualizacao.png` | Atualização de status (`PATCH /pedidos/1/status`) | HTTP 200 |

Os pedidos são armazenados em memória. Por isso, o teste de atualização depende de criar o pedido antes e executar as requisições na mesma sessão do servidor.
