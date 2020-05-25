import Express from 'express';

import routes from './routes';

class App {
  constructor() {
    this.server = new Express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Express.json());
  }

  routes() {
    this.server.use('/ws-brands/v1', routes);
  }
}

export default new App().server;
