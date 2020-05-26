import request from 'supertest';

import app from '../../src/app';
import { flags } from '../../src/databases';

describe('Card Data', () => {
  it('Should to return the limit of the card with a valid brand', async () => {
    const selectedFlag = Math.floor(Math.random() * 3);

    const response = await request(app).get(
      `/ws-brands/v1/installments-limit/${flags[selectedFlag].Bandeira}`
    );

    expect(flags[selectedFlag].Limite_parcelas).toBe(
      response.body.limite_parcelas
    );
  });

  it('Should to return the operators valids with a valid brand', async () => {
    const selectedFlag = Math.floor(Math.random() * 3);

    const response = await request(app).get(
      `/ws-brands/v1/installments-limit/${flags[selectedFlag].Bandeira}`
    );
    expect(flags[selectedFlag].Operadores).toEqual(
      response.body.Operadores_permitidos
    );
  });

  it('Should to return the brand code valid with a valid brand', async () => {
    const selectedFlag = Math.floor(Math.random() * 3);

    const response = await request(app).get(
      `/ws-brands/v1/installments-limit/${flags[selectedFlag].Bandeira}`
    );
    expect(flags[selectedFlag].Bandeira).toBe(response.body.Bandeira);
  });
});
