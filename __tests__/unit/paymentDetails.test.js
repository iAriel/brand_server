import request from 'supertest';

import app from '../../src/app';
import { flags } from '../../src/databases';

describe('verify the payment details', () => {
  it('should to return a right client name passing in the url a valid name of a brand', async () => {
    const response = await request(app).post('/pay/vista');
  });
});
