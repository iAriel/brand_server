import { flags } from '../../databases';

class RecivePaymentDetailsController {
  /**
   * @api {post} /pay/:brand Recebe dados para pagamento
   * @apiVersion  1.0.0
   * @apiGroup Recursos Autenticados
   * @apiDescription Envia para a bandeira do cartão a solicitação de pagamento.
   *
   * @apiParam (Params) {String} brand Nome da bandeira.
   *
   * @apiParam (Body) {String} numero_cartao Número do cartão de crédito. O segundo conjunto de números.
   * @apiParam (Body) {String} nome_cliente Nome do titular do cartão de crédito.
   * @apiParam (Body) {String} bandeira Nome da bandeira segundo opções a seguir: mister (cod.: 1111), vista (cod.:2222) ou daciolo (cod.: 3333).
   * @apiParam (Body) {Number} cod_seguranca Código de três dígitos.
   * @apiParam (Body) {Number} valor_em_centavos Valor em centavos da compra.
   * @apiParam (Body) {Number} parcelas Quantidade de parcelas para o pagamento.
   * @apiParam (Body) {Number} cod_operadora Código único da operadora de cartão. Será usado para que a bandeira verifique se o operador é seu cliente.
   *
   * @apiExample Exemplo de Requisição:
   *  POST http://localhost:3333/ws-brands/v1/pay/{brand}
   *  {
   *    "numero_cartao": "1111.2222.3333.4444",
   *    "nome_cliente": "USUARIO DE SOUSA",
   *    "bandeira": "mister",
   *    "cod_seguranca": 111,
   *    "valor_em_centavos": 500,
   *    "parcelas": 12,
   *    "cod_operadora": "op-xx"
   *  }
   *
   * @apiSuccess (200) {String} resposta Resultado da transação.
   * @apiSuccess (200) {String} nome_cliente Nome do titular do cartão de crédito.
   * @apiSuccess (200) {Number} valor_em_centavos Valor em centavos da compra.
   * @apiSuccess (200) {Number} parcelas Quantidade de parcelas em que o pagamento foi feito.
   *
   * @apiSuccessExample Resposta de Sucesso:
   *  HTTP/1.1 200 OK
   *  {
   *    "resposta": "sucesso",
   *    "nome_cliente": "USUARIO DE SOUSA",
   *    "valor_em_centavos": 500,
   *    "parcelas": 12
   *  }
   *
   *
   * @apiErrorExample {json} Bandeira inválida - Resposta de Erro:
   *  HTTP/1.1 401 Error
   *  {
   *    "resposta": "falha",
   *    "detalhes": "Bandeira não autorizada",
   *    "brand": "moster"
   *  }
   *
   * @apiErrorExample {json} Números de operador inválido - Resposta de Erro:
   *  HTTP/1.1 401 Error
   *  {
   *    "cod_resposta": "Operadora-negada",
   *    "resposta": "falha",
   *    "detalhes": "Operadora sem relação com a bandeira",
   *    "cod_operadora": "op-xx"
   *  }
   *
   * @apiErrorExample {json} Número de parcelas acima do permitido - Resposta de Erro:
   *  HTTP/1.1 401 Error
   *  {
   *    "resposta": "falha",
   *     "detalhes": "Limite de parcelas ultrapassado",
   *     "parcelas_solicitadas": 20,
   *     "limite_parcelas": 12
   *   }
   *
   */
  store(req, res) {
    const {
      nome_cliente,
      valor_em_centavos,
      parcelas,
      cod_operadora,
    } = req.body;

    const { brand } = req.params;

    const reciveFlag = flags.find((flag) => flag.Bandeira === brand);
    if (!reciveFlag) {
      return res.status(401).json({
        resposta: 'falha',
        detalhes: 'Bandeira não autorizada',
        brand,
      });
    }

    const reciveOP = Object.keys(reciveFlag.Operadores).find(
      (op) => op === cod_operadora
    );

    if (!reciveFlag.Operadores[reciveOP]) {
      return res.status(401).json({
        cod_resposta: 'Operadora-negada',
        resposta: 'falha',
        detalhes: 'Operadora sem relação com a bandeira',
        cod_operadora,
      });
    }

    if (reciveFlag.Limite_parcelas < parcelas) {
      return res.status(401).json({
        resposta: 'falha',
        detalhes: 'Limite de parcelas ultrapassado',
        parcelas_solicitadas: parcelas,
        limite_parcelas: reciveFlag.Limite_parcelas,
      });
    }

    return res.status(200).json({
      resposta: 'sucesso',
      nome_cliente,
      valor_em_centavos,
      parcelas,
    });
  }
}

export default new RecivePaymentDetailsController();
