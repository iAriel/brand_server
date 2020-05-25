import { Router } from 'express';

import LimitInstallmentsController from './app/controllers/LimitInstallmentsController';
import RecivePaymentDetailsController from './app/controllers/RecivePaymentDetailsController';

const routes = new Router();

routes.get('/installments-limit/:brand', LimitInstallmentsController.show);

routes.post('/pay/:brand', RecivePaymentDetailsController.store);

routes.get('/v1/status', (req, res) => {
  return res.status(200).json({ status: 'Serviço disponível WS2' });
});

routes.use('*', (req, res) => {
  return res.status(400).json({ error: 'Router not found' });
});

export default routes;
