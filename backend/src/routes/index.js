const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    message: 'API funcionando 🚀'
  });
});

routes.get('/api/hello', (req, res) => {
  return res.json({
    message: 'Olá do backend!',
    timestamp: new Date().toISOString()
  });
});

routes.post('/api/message', (req, res) => {
  const { text } = req.body;
  return res.json({
    received: text,
    response: `Servidor recebeu: "${text}"`,
    timestamp: new Date().toISOString()
  });
});

module.exports = routes;