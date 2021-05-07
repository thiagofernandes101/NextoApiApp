let solicitacaoService = require('../services/solicitacao.service');
let tipoSolicitacaoService = require('../services/tipoSolicitacao.service');
let statusSolicitacaoService = require('../services/statusSolicitacao.service');

let solicitacaoSpecifications = {};
solicitacaoSpecifications.existeSolicitacaoCadastradaPorId = existeSolicitacaoCadastradaPorId;
solicitacaoSpecifications.existeTipoSolicitacaoCadastradaPorId = existeTipoSolicitacaoCadastradaPorId;

module.exports = solicitacaoSpecifications;

async function existeSolicitacaoCadastradaPorId(id) {
    let solicitacaoCadastrada = await solicitacaoService.getSolicitacaoById(id);
    return solicitacaoCadastrada.length > 0
}

async function existeTipoSolicitacaoCadastradaPorId(id) {
    let tipoSolicitacaoCadastrada = await tipoSolicitacaoService.getTipoSolicitacaoById(id);
    return tipoSolicitacaoCadastrada.length > 0;
}

async function existeStatusSolicitacaoCadastradoPorId(id) {
    let statusSolicitacaoCadastrado = await statusSolicitacaoService.getStatusSolicitacaoById(id);
    return statusSolicitacaoCadastrado.length > 0;
}