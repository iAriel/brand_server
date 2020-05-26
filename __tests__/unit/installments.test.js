import request from 'supertest';

import app from '../../src/app';
import { flags } from '../../src/databases';

describe('Card Data', () => {
  it('Should to return the limit of the card with a valid brand', async () => {
    const response = await request(app).get(
      '/ws-brands/v1/installments-limit/vista'
    );

    expect(flags[1].Limite_parcelas).toBe(response.body.limite_parcelas);
  });

  it('Should to return the operators valids with a valid brand', async () => {
    const response = await request(app).get(
      '/ws-brands/v1/installments-limit/vista'
    );
    expect(flags[1].Operadores).toEqual(response.body.Operadores_permitidos);
  });

  it('Should to return the brand code valid with a velid brand', async () => {
    const response = await request(app).get(
      '/ws-brands/v1/installments-limit/vista'
    );
    expect(flags[1].Bandeira).toBe(response.body.Bandeira);
  });
});
