class StatusController {
  /**
   * @api {get} /status Status da API
   * @apiVersion  1.0.0
   * @apiGroup Recursos Abertos
   * @apiDescription Verifica a disponibilidade da API.
   *
   * @apiSuccess (200) {String} status Verifica a disponibilidade da API.
   *
   * @apiSuccessExample Resposta de Sucesso:
   *  HTTP/1.1 200 OK
   *  {
   *    "status": "Serviço disponível WS2"
   *  }
   *
   */
  show(req, res) {
    return res.status(200).json({ status: 'Serviço disponível WS2' });
  }
}

export default new StatusController();
