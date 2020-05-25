import { flags } from '../../databases';

class RecivePaymentDetailsController {
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
