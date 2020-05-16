import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json({
    name: 'Brand',
    Version: '1.0.0',
    description:
      'A API da bandeira de cartão de crédito intermediará a comunicação entre a operadora e o banco emissor.',
  });
});

routes.get('/ws-brand/v1/status', (req, res) => {
  return res.status(200).json({ status: 'Serviço disponível WS2' });
});

routes.use('*', (req, res) => {
  return res.status(400).json({ error: 'Router not found' });
});

export default routes;
