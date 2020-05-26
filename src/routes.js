import { Router } from 'express';

import StatusController from './app/controllers/StatusController';
import LimitInstallmentsController from './app/controllers/LimitInstallmentsController';
import RecivePaymentDetailsController from './app/controllers/RecivePaymentDetailsController';

const routes = new Router();

routes.get('/status', StatusController.show);

routes.get('/installments-limit/:brand', LimitInstallmentsController.show);

routes.post('/pay/:brand', RecivePaymentDetailsController.store);

routes.use('*', (req, res) => {
  return res.status(400).json({ error: 'Router not found' });
});

export default routes;
