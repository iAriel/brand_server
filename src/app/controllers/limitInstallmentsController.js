import { flags } from '../../databases';

class limitInstallments {
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

export default new limitInstallments();
