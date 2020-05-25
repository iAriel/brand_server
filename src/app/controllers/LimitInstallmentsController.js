import { flags } from '../../databases';

class LimitInstallmentsController {
  /**
   * @api {get} /installments-limit/:brand Limite de parcelas.
   * @apiVersion  1.0.0
   * @apiGroup Recursos Autenticados
   * @apiDescription Verifica a quantidade permitida de parcelas em uma compra a partir da bandeira informada.
   *
   * @apiParam (Params) {String} brand Nome da bandeira.
   *
   * @apiSuccessExample Resposta de Sucesso:
   *  HTTP/1.1 200 OK
   *  {
   *    "Bandeira": "vista",
   *    "limite_parcelas": 6,
   *    "Operadores_permitidos": {
   *      "op-01": false,
   *      "op-02": true,
   *      "op-03": true
   *    }
   *  }
   *
   *
   * @apiErrorExample {json} Bandeira inválida - Resposta de Erro:
   *  HTTP/1.1 401 Error
   *  {
   *    "resposta": "erro",
   *    "detalhes": "A bandeira informada não existe",
   *  }
   */

  show(req, res) {
    const { brand } = req.params;
    const result = flags.find((flag) => flag.Bandeira === brand) || {};

    if (result.Bandeira) {
      return res.status(200).json({
        Bandeira: result.Bandeira,
        limite_parcelas: result.Limite_parcelas,
        Operadores_permitidos: result.Operadores,
      });
    }
    return res.status(401).json({
      resposta: 'erro',
      detalhes: 'A bandeira informada não existe',
    });
  }
}

export default new LimitInstallmentsController();
