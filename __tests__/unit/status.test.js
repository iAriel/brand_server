import request from 'supertest';

import app from '../../src/app';

describe('System Status', () => {
  it('Should verify availability system', async () => {
    const { status, body } = await request(app).get('/ws-brands/v1/status');

    expect({ body: 'Serviço disponível WS2', status: 200 }).toEqual({
      body: body.status,
      status,
    });
  });
});
