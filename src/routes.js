import { Router } from 'express';

import limitInstallmentsController from './app/controllers/limitInstallmentsController';
import recivePaymentDetailsController from './app/controllers/recivePaymentDetailsController';

const routes = new Router();

routes.get('/installments-limit/:brand', limitInstallmentsController.show);

routes.post('/pay/:brand', recivePaymentDetailsController.store);

routes.get('/v1/status', (req, res) => {
  return res.status(200).json({ status: 'Serviço disponível WS2' });
});

routes.use('*', (req, res) => {
  return res.status(400).json({ error: 'Router not found' });
});

export default routes;
