const app = require('./app');
const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`API de pedidos em execução na porta ${porta}`));
